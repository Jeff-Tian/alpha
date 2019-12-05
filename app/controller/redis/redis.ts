import { Controller } from 'egg';

export default class RedisController extends Controller {
  public async index() {
    const { ctx } = this;

    const keys = await ctx.app.redis.keys('*');
    const res = new Array<any>();

    for (const key of keys) {
      res.push({ key, value: await ctx.app.redis.get(key) });
    }

    ctx.body = res;
  }
}
