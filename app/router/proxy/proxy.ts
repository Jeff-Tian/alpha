import { Application } from 'egg';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const cacheResult = async (ctx, next) => {
  const cache = await ctx.app.redis.get(ctx.query.url);

  if (cache) {
    const final = new Buffer(cache, 'hex').toString();
    try {
      ctx.type = 'json';
      ctx.body = JSON.parse(final);
    } catch (ex) {
      ctx.type = 'html';
      ctx.body = final;
    }
  } else {
    await next();
  }
};

export default (app: Application) => {
  const { controller, router } = app;

  const subRouter = router.namespace('/proxy');

  subRouter.get('/', controller.proxy.proxy.get);
  subRouter.post('/', controller.proxy.proxy.post);
  subRouter.get('/pipe-file', controller.proxy.proxy.pipeFile);
  subRouter.get('/no-cache', controller.proxy.proxy.get);
};
