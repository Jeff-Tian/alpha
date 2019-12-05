import { Controller } from 'egg';

export default class UsersController extends Controller {
  public async index() {
    const { ctx } = this;

    const query = {
      limit:
        typeof ctx.query.limit !== 'undefined' ? Number(ctx.query.limit) : 10,
      offset:
        typeof ctx.query.offset !== 'undefined' ? Number(ctx.query.offset) : 0,
    };

    ctx.body = await ctx.model.User.findAll(query);
  }
}
