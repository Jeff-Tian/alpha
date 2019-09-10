import {Controller} from 'egg'
// @ts-ignore
import querystring from 'querystring'

export default class PassportRelayController extends Controller {
  public async relay() {
    const {ctx} = this

    return (ctx.body = ctx.user.id)

    // tslint:disable-next-line:no-commented-code
    // const referer = await ctx.app.refererCache.get(ctx.query.state)
    // await ctx.app.refererCache.delete(ctx.query.state)
    //
    // if (referer) {
    //   ctx.redirect(
    //     referer +
    //       (referer.indexOf('?') > 0 ? '&' : '?') +
    //       querystring.stringify({token: ctx.user.id})
    //   )
    // } else {
    //   ctx.body = {token: ctx.user.id}
    // }
  }
}
