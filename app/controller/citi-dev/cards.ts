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
    ctx.logger.info('getting cards for ', {user})
    const accessToken = await citiOAuth.getToken(user.uid)
    ctx.logger.info('the user\'s accessToken is ', {accessToken})
    ctx.body = await citiOAuth.Cards.getCards(accessToken.access_token)
  }
}
