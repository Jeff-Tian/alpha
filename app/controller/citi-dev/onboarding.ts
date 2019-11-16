import CitiOAuth from 'citi-oauth'
import {Controller} from 'egg'

const getInstance = ctx =>
  new CitiOAuth(
    ctx.citiOAuthOptions.key,
    ctx.citiOAuthOptions.secret,
    ctx.citiOAuthOptions.successReturnToOrRedirect,
    ctx.citiOAuthOptions.saveToken,
    ctx.citiOAuthOptions.getToken,
    ctx.logger
  )

export default class OnboardingController extends Controller {
  public async getProducts() {
    const {ctx} = this

    ctx.body = await getInstance(ctx).Onboarding.getProducts()
  }

  public async apply() {
    const {ctx} = this

    ctx.body = await getInstance(ctx).Onboarding.apply(ctx.body)
  }
}
