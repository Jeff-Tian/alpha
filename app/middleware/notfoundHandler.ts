import { Context } from 'egg';

export default function() {
  return async function notFoundHandler(ctx: Context, next) {
    await next();

    if (ctx.status === 404 && !ctx.body) {
      if (ctx.acceptJSON) {
        ctx.body = { error: 'Not Found' };
      } else {
        await ctx.app.controller.home.render.bind(ctx)();
      }
    }
  };
}
