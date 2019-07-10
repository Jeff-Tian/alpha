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

    let res
    ctx.type = 'image/*'
    if (ticket) {
      res = await WechatOAuth.getQRCodeByTicket(decodeURIComponent(ticket))
    } else {
      const wechatOAuth = this.getWechatOAuthClient()

      res = await wechatOAuth.getQRCode(
        ctx.query.data
          ? JSON.parse(decodeURIComponent(ctx.query.data))
          : undefined,
        ctx.query.token
      )
    }

    ctx.res.write(res)
    ctx.res.end()
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
