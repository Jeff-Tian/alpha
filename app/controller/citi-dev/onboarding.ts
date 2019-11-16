import Action from 'async-retry.ts'
import {Controller} from 'egg'
import {getInstance, retryHandlers} from '../../common/citi-helper'

const retry = app => async action =>
  Action.retryAsync(action, 1, retryHandlers(app), app.logger)

export default class OnboardingController extends Controller {
  public async getProducts() {
    const {ctx} = this

    await retry(ctx.app)(async () => {
      ctx.body = await getInstance(ctx).Onboarding.getProducts()
    })
  }

  public async apply() {
    const {ctx} = this

    await retry(ctx.app)(async () => {
      ctx.body = await getInstance(ctx).Onboarding.apply(ctx.body)
    })
  }

  public async getApplicationStatus() {
    const {ctx} = this

    await retry(ctx.app)(async () => {
      ctx.body = await getInstance(ctx).Onboarding.getApplicationStatus(
        ctx.params.applicationId
      )
    })
  }
}
