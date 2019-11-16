import {Controller} from 'egg'
import {getInstance} from './citi-helper'

export default class OnboardingController extends Controller {
  public async getProducts() {
    const {ctx} = this

    ctx.body = await getInstance(ctx).Onboarding.getProducts()
  }

  public async apply() {
    const {ctx} = this

    ctx.body = await getInstance(ctx).Onboarding.apply(ctx.body)
  }

  public async getApplicationStatus() {
    const {ctx} = this

    ctx.body = await getInstance(ctx).Onboarding.getApplicationStatus(
      ctx.params.applicationId
    )
  }
}
