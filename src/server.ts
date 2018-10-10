import Koa from 'koa';
import bodyParser from 'koa-bodyparser-ts';
import router from './routes';

const app = new Koa();

app.use(bodyParser());
app.use(router.routes());

export default app;
