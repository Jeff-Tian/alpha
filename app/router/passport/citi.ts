import {Application} from 'egg'
import rememberReferer from '../../middleware/rememberReferer'

export default (app: Application) => {
  const {controller, router} = app

  router.get('passport.passportStart', '/passport/citi', rememberReferer)
  app.passport.mount('citi', app.config.passportCiti)
  router.get('/passport/citi/passport-relay', controller.passportRelay.relay)

  router.get('/test', ctx => {
    ctx.body = 'hello'
  })
}
