import { Controller } from 'egg';
import querystring from 'querystring';

export default class PassportRelayController extends Controller {
  public async relay() {
    const { ctx } = this;

    const referer = await ctx.app.refererCache.get(ctx.query.state);
    await ctx.app.refererCache.delete(ctx.query.state);

    if (referer) {
      ctx.redirect(
        referer +
          (referer.indexOf('?') > 0 ? '&' : '?') +
          querystring.stringify({
            token: ctx.app.jwt.sign(ctx.user.id, ctx.app.config.jwt.secret),
            traceId: ctx.traceId,
          }),
      );
    } else {
      ctx.body = {
        token: ctx.app.jwt.sign(ctx.user.id, ctx.app.config.jwt.secret),
        traceId: ctx.traceId,
      };
    }
  }
}
