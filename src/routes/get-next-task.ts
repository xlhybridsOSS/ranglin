import { Context } from 'koa';
import { getManager } from 'typeorm';
import { Task } from '../entity/Task';
import { TaskExecution } from '../entity/TaskExecution';

export default (ctx: Context) =>
  getManager().transaction(async entityManager => {
    const { taskPath } = ctx.request.body;

    const task = await entityManager
      .createQueryBuilder(Task, 't')
      // Prevents the task execution from being dequeued while this request is being processed
      // lock is kept until transaction completes or is rolled back.
      .setLock('pessimistic_read')
      .innerJoinAndSelect('t.nextExecution', 'e')
      .where('t.path LIKE :path', { path: `${taskPath}%` })
      .andWhere('t.activeExecution IS NULL')
      .orderBy('e.createdAt', 'ASC')
      .addOrderBy('t.id', 'ASC')
      .limit(1)
      .getOne();

    if (task) {
      await entityManager
        .createQueryBuilder()
        .relation(Task, 'activeExecution')
        .of(task)
        .set(task.nextExecution);
      await entityManager
        .createQueryBuilder()
        .relation(Task, 'nextExecution')
        .of(task)
        .set(null);
    }

    if (task) {
      ctx.status = 200;
      ctx.response.body = task.path;
    } else {
      ctx.status = 404;
    }
  });
