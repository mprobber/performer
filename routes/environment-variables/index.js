// @flow
import KoaRouter from 'koa-router';
import EnvironmentVariablesStore from '../../stores/EnvironmentVariablesStore';
import { read, write } from '../../lib/serializer';
const router = new KoaRouter();

router.get('/', async ctx => {
  await read();
  ctx.body = EnvironmentVariablesStore.environmentVariables.map(
    environmentVariable => environmentVariable.serialize(),
  );
});

router.post('/', async ctx => {
  const { body } = ctx.request;
  EnvironmentVariablesStore.updateOne(body);
  await write();
  await read();
  ctx.body = EnvironmentVariablesStore.environmentVariables.map(
    environmentVariable => environmentVariable.serialize(),
  );
});

export default router;
