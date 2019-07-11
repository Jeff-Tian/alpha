import {Controller} from 'egg'
import WechatOAuth from 'wechat-oauth-ts'
import {KeySecretSelection} from '../validate/GetAccessTokenRequest'

export default class WechatDevController extends Controller {
  public async getAccessToken() {
    const {ctx} = this
    const wechatOAuth = this.getWechatOAuthClient()
    ctx.body = await wechatOAuth.getClientAccessToken()
  }

  public async getQRCode() {
    const {ctx} = this
    const {ticket} = ctx.query

    const wechatOAuth = this.getWechatOAuthClient()

    const res = ticket
      ? await wechatOAuth.getQRCodeLinkByTicket(ticket)
      : await wechatOAuth.getQRCodeLink(
          ctx.query.data
            ? JSON.parse(decodeURIComponent(ctx.query.data))
            : undefined,
          ctx.query.token
        )

    ctx.redirect(res)
  }

  public async message() {
    const {ctx} = this
    const message = ctx.request.body

    ctx.logger.info('get message from wechat: ', {message})

    const clients = JSON.parse(
      process.env.WECHAT_REDIRECT_CLIENTS || JSON.stringify([])
    )

    const results = (await Promise.all(
      clients.map(c =>
        ctx.curl(c, {
          method: 'POST',
          dataType: 'application/xml',
          data: message,
        })
      )
    )).map((r: any) => r.status)

    ctx.logger.info('redirect results: ', results)

    ctx.body = {message, redirects: results}
  }

  private getWechatOAuthClient() {
    const {ctx} = this
    const {select} = ctx.query
    let {key, secret} = ctx.query

    if (select !== KeySecretSelection.CUSTOMIZED) {
      key = this.app.config[select].key
      secret = this.app.config[select].secret
    }

    return new WechatOAuth(key, secret)
  }
}
