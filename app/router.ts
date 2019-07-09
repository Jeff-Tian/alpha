import {Application} from 'egg'
import validate from './middleware/validate'

export default (app: Application) => {
  const {controller, router} = app

  router.get('/health-check', controller.home.index)
  router.get('/', controller.home.render)
  router.get('/os', controller.os.info)

  app.router.get('/user', 'home.render')

  app.passport.mount('github', app.config.passportGithub)
  app.passport.mount('wechat', app.config.passportWechat)
  app.passport.mount('citi', app.config.passportCiti)

  app.router.get('/logout', 'user.logout')

  app.router.resources('users', '/users', controller.users)

  app.all('/user/token', app.oAuth2Server.token())
  app.get('/user/authorize', app.oAuth2Server.authorize(), 'user.code')
  app.get(
    '/user/authenticate',
    app.oAuth2Server.authenticate(),
    'user.authenticate'
  )

  app.router.get(
    'wechatDev.getAccessToken',
    '/wechat-dev/access_token',
    validate,
    controller.wechatDev.getAccessToken
  )
}
