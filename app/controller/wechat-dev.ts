import { Controller } from 'egg'
import * as querystring from 'querystring'
import WechatOAuth from 'wechat-oauth-ts'
import { KeySecretSelection } from '../validate/GetAccessTokenRequest'

export default class WechatDevController extends Controller {
  public async getAccessToken() {
    const { ctx } = this
    const wechatOAuth = this.getWechatOAuthClient()
    ctx.body = await wechatOAuth.getClientAccessToken()
  }

  public async getQRCode() {
    const { ctx } = this
    const { ticket } = ctx.query
    let { mode } = ctx.query

    if (!mode) {
      mode = 'redirect'
    }

    const wechatOAuth = this.getWechatOAuthClient()

    const res = ticket
      // tslint:disable-next-line:max-line-length
      ? (mode === 'raw' ? await wechatOAuth.getQRCode(ticket) : await wechatOAuth.getQRCodeLinkByTicket(ticket))
      // tslint:disable-next-line:max-line-length
      : (mode === 'raw' ? await wechatOAuth.getQRCode(ctx.query.data ? JSON.parse(decodeURIComponent(ctx.query.data)) : undefined) : await wechatOAuth.getQRCodeLink(
        ctx.query.data
          ? JSON.parse(decodeURIComponent(ctx.query.data))
          : undefined,
        ctx.query.token
      ))

    if (mode === 'raw') {
      ctx.body = res.data
      return
    }

    if (mode === 'redirect') {
      ctx.redirect(res)
      return
    }

    if (mode === 'proxy') {
      const result = await ctx.curl(res)
      ctx.headers = result.headers
      ctx.body = result.data
      return
    }

    ctx.throw(423, 'Unknown error')
  }

  public async jsSDKSign() {
    const { ctx } = this

    const wechatOAuth = this.getWechatOAuthClient()

    ctx.body = {
      ...await wechatOAuth.jsSDKSign(
        ctx.query.url || ctx.get('referer'), ctx.query.ticket
      ),
      appId: wechatOAuth.appId
    };
  }

  public async message() {
    const { ctx } = this
    const message = ctx.request.body

    ctx.logger.info('get message from wechat: ', { message })

    const clients = JSON.parse(
      process.env.WECHAT_REDIRECT_CLIENTS || JSON.stringify([])
    )

    const results = (await Promise.all(
      clients.map(c =>
        ctx.curl(c, {
          method: 'POST',
          contentType: 'application/xml', // 这一行并不起作用，已提 PR：https://github.com/node-modules/urllib/pull/325
          dataType: 'json',
          content: message,
          headers: {
            'content-type': 'application/xml',
          },
        })
      )
    )).map((r: any) => r.status)

    ctx.logger.info('redirect results: ', results)

    ctx.body = { message, redirects: results }
  }

  public async code2Session() {
    const { ctx } = this
    const wechatOAuth = this.getWechatOAuthClient()
    ctx.body = await wechatOAuth.code2Session(ctx.query.code)
  }

  public async passportStart() {
    const { ctx } = this
    ctx.body = 'ok'
  }

  public async passportCallback() {
    const { ctx } = this

    if (
      ['/passport/weapp/callback', '/passport/weapp-yiqifen/callback'].indexOf(
        ctx.path
      ) >= 0
    ) {
      return (ctx.body = ctx.user)
    }

    const referer = await ctx.app.refererCache.get(ctx.query.state)

    await ctx.app.refererCache.delete(ctx.query.state)

    if (ctx.app.env === 'unittest') {
      ctx.body = { ...ctx.query, referer }
    }

    const oauthClient = new WechatOAuth(
      ctx.app.config.passportWechat.clients[KeySecretSelection.PASSPORT_HARDWAY].key,
      ctx.app.config.passportWechat.clients[KeySecretSelection.PASSPORT_HARDWAY].secret
    )

    const accessTokenResult = await oauthClient.getAccessToken(ctx.query.code)

    if (referer) {
      ctx.redirect(
        referer +
        (referer.indexOf('?') > 0 ? '&' : '?') +
        querystring.stringify(accessTokenResult)
      )
    } else {
      ctx.body = accessTokenResult
    }
  }

  private getWechatOAuthClient() {
    const { ctx } = this
    const { select } = ctx.query
    let { key, secret } = ctx.query

    if (select !== KeySecretSelection.CUSTOMIZED) {
      key = this.app.config.passportWechat.clients[select].key
      secret = this.app.config.passportWechat.clients[select].secret
    }

    return new WechatOAuth(key, secret)
  }
}
