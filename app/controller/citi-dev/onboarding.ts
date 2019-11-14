import CitiOAuth from 'citi-oauth'
import {Controller} from 'egg'

export default class OnboardingController extends Controller {
  public async getProducts() {
    const {ctx} = this

    const citiOAuth = new CitiOAuth(
      ctx.citiOAuthOptions.key,
      ctx.citiOAuthOptions.secret,
      ctx.citiOAuthOptions.successReturnToOrRedirect,
      ctx.citiOAuthOptions.saveToken,
      ctx.citiOAuthOptions.getToken,
      ctx.logger
    )

    ctx.body = await citiOAuth.Onboarding.getProducts()
  }
}
