import Router from 'koa-router';
import createRequest from './create-request';
import getNextTask from './get-next-task';

const router = new Router();

router.get('/*', async ctx => {
  ctx.body = 'Hello World!';
});

router.post('/request', createRequest);
router.put('/start-next-task', getNextTask);

export default router;
