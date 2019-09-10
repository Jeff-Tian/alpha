import {Application} from 'egg'

export default (app: Application) => {
  const {controller, router} = app

  app.passport.mount('citi', app.config.passportCiti)
  router.get('/passport/citi/passport-relay', controller.passportRelay.relay)

  router.get('/test', ctx => {
    ctx.body = 'hello'
  })
}
