import {Controller} from 'egg'
import WechatOAuth from 'wechat-oauth-ts'
import {KeySecretSelection} from '../validate/GetAccessTokenRequest'

export default class WechatDevController extends Controller {
  public async getAccessToken() {
    const {ctx} = this
    const {select} = ctx.query
    let {key, secret} = ctx.query

    if (select !== KeySecretSelection.CUSTOMIZED) {
      key = this.app.config[select].key
      secret = this.app.config[select].secret
    }

    const wechatOAuth = new WechatOAuth(key, secret)
    ctx.body = await wechatOAuth.getClientAccessToken()
  }

  public async getQRCode() {
    const {ctx} = this
    const {select} = ctx.query
    let {key, secret} = ctx.query

    if (select !== KeySecretSelection.CUSTOMIZED) {
      key = this.app.config[select].key
      secret = this.app.config[select].secret
    }

    const wechatOAuth = new WechatOAuth(key, secret)
    ctx.body = await wechatOAuth.getQRCode(
      JSON.parse(decodeURIComponent(ctx.query.data)),
      ctx.query.token
    )
  }
}
