import Router from 'koa-router';
import claimNextTask from './claim-next-task';
import createRequest from './create-request';

const router = new Router();

router.get('/*', async ctx => {
  ctx.body = 'Hello World!';
});

router.post('/request', createRequest);
router.put('/claim-next-task', claimNextTask);

export default router;
