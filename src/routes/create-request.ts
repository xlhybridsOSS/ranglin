import { Context } from 'koa';
import { getManager } from 'typeorm';
import { Task } from '../entity/Task';
import { TaskExecution, TaskExecutionStatus } from '../entity/TaskExecution';
import { TaskRequest } from '../entity/TaskRequest';

export default (ctx: Context) =>
  getManager().transaction(async entityManager => {
    const path = ctx.request.body.task;

    let task = await entityManager
      .createQueryBuilder(Task, 't')
      // Prevents the task execution from being dequeued while this request is being processed
      // lock is kept until transaction completes or is rolled back.
      .setLock('pessimistic_read')
      .where('t.path = :path', { path: path.toLowerCase() })
      .getOne();

    if (!task) {
      task = new Task();
      task.path = path.toLowerCase();
      await entityManager.save(task);
    }

    const next = await entityManager
      .createQueryBuilder()
      .relation(Task, 'nextExecution')
      .of(task)
      .loadOne();

    if (!next) {
      const execution = new TaskExecution();
      execution.status = TaskExecutionStatus.Pending;
      execution.task = task;
      await entityManager.save(execution);
      task.nextExecution = execution;
      await entityManager.save(task);
    }

    const request = new TaskRequest();
    request.execution = await task.nextExecution;
    await entityManager.save(request);
    ctx.status = 200;
    ctx.response.body = `Request ${request.id || '?'}`;
  });
