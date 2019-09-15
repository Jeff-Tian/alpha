import {Application} from 'egg'
import rememberReferer from '../middleware/rememberReferer'
import validate from '../middleware/validate'

export default (app: Application) => {
  const {controller, router} = app

  router.get('/health-check', controller.home.index)
  router.get('/os', controller.os.info)
  router.get('/user', 'home.render')

  app.passport.mount('github', app.config.passportGithub)
  app.router.get(
    'wechatDev.passportCallback',
    '/passport/wechat-hardway/callback',
    controller.wechatDev.passportCallback
  )
  app.router.get(
    'wechatDev.passportStart',
    '/passport/wechat-hardway',
    rememberReferer
  )
  app.passport.mount('wechat', app.config.passportWechat.clients.wechat)
  app.passport.mount(
    'wechat-hardway',
    app.config.passportWechat.clients['wechat-hardway']
  )

  const localStrategy = app.passport.authenticate('local')
  app.router.post('/passport/local', localStrategy)

  router.get('/logout', 'user.logout')

  router.resources('users', '/users', controller.users)

  app.all('/user/token', app.oAuth2Server.token())
  app.get('/user/authorize', app.oAuth2Server.authorize(), 'user.code')
  app.get(
    '/user/authenticate',
    app.oAuth2Server.authenticate(),
    'user.authenticate'
  )

  router.get(
    'wechatDev.getAccessToken',
    '/wechat-dev/access_token',
    validate,
    controller.wechatDev.getAccessToken
  )
  router.get(
    'wechatDev.getQRCode',
    '/wechat-dev/qr-code',
    validate,
    controller.wechatDev.getQRCode
  )
  router.get(
    'wechatDev.code2Session',
    '/wechat-dev/code_2_session',
    validate,
    controller.wechatDev.code2Session
  )

  router.post(
    'wechatDev.message',
    '/endpoints/wechat/message',
    controller.wechatDev.message
  )

  if (app.config.env === 'prod') {
    router.get('/api/currentUser', controller.user.current)
  } else {
    router.all('/api/*', controller.home.proxy)
  }

  router.get('/', controller.home.render)

  // router.get('*', controller.home.render)
}
