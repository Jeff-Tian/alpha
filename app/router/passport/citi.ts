import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  app.passport.mount('citi', app.config.passportCiti)
  router.get('/passport/citi/passport-relay', controller.passportRelay.relay)

  router.get('wechatDev.rewards.pointBalance', '/citi-dev/rewards/point-balance', controller.citiDev.rewards.getPointBalance)
}
