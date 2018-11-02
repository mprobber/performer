// @flow
import KoaRouter from 'koa-router';
import EnvironmentVariablesStore from '../../stores/EnvironmentVariablesStore';
import EnvironmentVariable from '../../Models/EnvironmentVariable';
const router = new KoaRouter();

router.get('/', async ctx => {
  ctx.body = EnvironmentVariablesStore.environmentVariables.map(
    environmentVariable => environmentVariable.serialize(),
  );
});

router.post('/', async ctx => {
  const body = ctx.request;
  const environmentVariable = new EnvironmentVariable(body);
  EnvironmentVariablesStore.add(environmentVariable);
  body.status_code = 200;
});

export default router;
