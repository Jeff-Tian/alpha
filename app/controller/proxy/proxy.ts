import {Controller} from 'egg'

export default class ProxyController extends Controller {
  public async get() {
    const {ctx} = this

    ctx.type = 'html'
    ctx.body = (await ctx.curl(ctx.query.url, {streaming: true})).res
  }
}
