import { Controller } from 'egg';

export default class ProxyController extends Controller {
  public async get() {
    const { ctx } = this;

    const { data } = (await ctx.curl(ctx.query.url, { streaming: false, retry: 3, timeout: [ 3000, 30000 ] }));

    ctx.app.redis.set(ctx.query.url, data.toString('hex'));
    ctx.app.redis.expire(ctx.query.url, process.env.PROXY_TIMEOUT ? Number(process.env.PROXY_TIMEOUT) : 60 * 60 * 12);

    const final = data.toString();

    try {
      ctx.type = 'json';
      ctx.body = JSON.parse(final);
    } catch (ex) {
      ctx.type = 'html';
      ctx.bod = final;
    }
  }

}
