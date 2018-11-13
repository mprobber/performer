// @flow
import KoaRouter from 'koa-router';
import ServiceStore from '../../stores/ServiceStore';
import { read, write } from '../../lib/serializer';
const router = new KoaRouter();

router.get('/', async ctx => {
  await read();
  ctx.body = ServiceStore.services.map(service => service.serialize());
});

router.post('/', async ctx => {
  await read();
  const { body } = ctx.request;
  ServiceStore.updateOne(body);
  await write();
  await read();
  ctx.body = ServiceStore.services.map(service => service.serialize());
});

router.post('/:name/start', async ctx => {
  await read();
  const { name } = ctx.params;
  const service = ServiceStore.services.find(service => service.name === name);

  if (!service) {
    ctx.body = 'ahhhh';
    return;
  }
  service.process.start();

  ctx.body = service.serialize();
});

export default router;
