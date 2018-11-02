// @flow
import KoaRouter from 'koa-router';
import EnvironmentVariables from './environment-variables';
import Services from './services';

const router = new KoaRouter();
router.use('/environment-variables', EnvironmentVariables.routes());
router.use('/services', Services.routes());

export default router;
