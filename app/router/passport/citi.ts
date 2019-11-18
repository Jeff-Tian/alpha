import {Application, Context} from 'egg'
import {injectCitiOAuthOptions} from '../../middleware/citi/injectCitiOAuthOptions'

export default (app: Application) => {
  const {controller, router} = app

  app.passport.mount('citi', app.config.passportCiti)

  router.get(
    'citiDev.passportRelay',
    '/passport/citi/passport-relay',
    controller.passportRelay.relay
  )

  router.get(
    'citiDev.rewards.pointBalance',
    '/citi-dev/rewards/point-balance',
    controller.citiDev.rewards.getPointBalance
  )

  const jwt = app.middleware.jwt(app.config.jwt)

  router.get(
    'citiDev.cards.list',
    '/citi-dev/cards',
    jwt,
    injectCitiOAuthOptions(app),
    controller.citiDev.cards.getList
  )

  router.get('citiDev.token.get', '/citi-dev/token', async (ctx: Context) => {
    ctx.body = await app.config.passportCiti.getToken(ctx.query.uid)
  })

  router.get(
    'citiDev.onboarding.products',
    '/citi-dev/onboarding/products',
    injectCitiOAuthOptions(app),
    controller.citiDev.onboarding.getProducts
  )

  router.post(
    'citiDev.onboarding.apply',
    '/citi-dev/onboarding/apply',
    injectCitiOAuthOptions(app),
    controller.citiDev.onboarding.apply
  )

  router.get(
    'citiDev.onboarding.getApplicationStatus',
    '/citi-dev/onboarding/get-application-status/:applicationId',
    injectCitiOAuthOptions(app),
    controller.citiDev.onboarding.getApplicationStatus
  )
}
