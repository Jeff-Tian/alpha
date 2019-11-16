import {Controller} from 'egg'
import {getInstance} from '../../common/citi-helper'

export default class CardsController extends Controller {
  public async getList() {
    const {ctx} = this

    const citiOAuth = getInstance(ctx)

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
