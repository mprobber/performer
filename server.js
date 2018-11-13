// @flow
import Koa from 'koa';
import KoaBodyparser from 'koa-bodyparser';
import Router from './routes';
import Cors from '@koa/cors';

const app = new Koa();
app.use(KoaBodyparser());
app.use(Cors());
app.use(Router.routes());

app.listen(3256);
