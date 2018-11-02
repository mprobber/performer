// @flow
import Koa from 'koa';
import KoaBodyparser from 'koa-bodyparser';
import Router from './routes';

const app = new Koa();
app.use(KoaBodyparser());
app.use(Router.routes());

app.listen(3256);
