import CitiOAuth from 'citi-oauth'
import {Controller} from 'egg'

export default class CardsController extends Controller {
  public async getList() {
    const {ctx} = this

    const citiOAuth = new CitiOAuth(
      ctx.citiOAuthOptions.key,
      ctx.citiOAuthOptions.secret,
      ctx.citiOAuthOptions.successReturnToOrRedirect,
      ctx.citiOAuthOptions.saveToken,
      ctx.citiOAuthOptions.getToken,
      ctx.logger
    )

    const user = await ctx.service.user.get(ctx.state.user, 'citi')
    const accessToken = await citiOAuth.getToken(user.uid)

    if (!accessToken) {
      return ctx.redirect('/passport/citi')
    }

    ctx.body = await citiOAuth.Cards.getCards(
      JSON.parse(accessToken).access_token
    )
  }
}
