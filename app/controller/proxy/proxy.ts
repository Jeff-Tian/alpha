import {convert} from 'doc-giggle'
import {Controller} from 'egg'

export default class ProxyController extends Controller {
  public async get() {
    const {ctx} = this

    ctx.type = 'html'
    ctx.body = (await ctx.curl(ctx.query.url, {streaming: true})).res
  }

  public async convert() {
    const {ctx} = this

    const url = ctx.query.url
    const res = await convert(url)

    ctx.type = res.response.headers['Content-Type']
    ctx.body = res.data
  }
}
