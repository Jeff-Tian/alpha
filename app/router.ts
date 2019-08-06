import {Application} from 'egg'
import {ICacheStorage} from './controller/wechat-dev'
import validate from './middleware/validate'

export class RefererCache {
  private static globalRefererCache: RefererCache
  public readonly cacheTimeout: number
  private storage: ICacheStorage

  public constructor(
    store: ICacheStorage,
    config: {cacheTimeout: number} = {cacheTimeout: 1000 * 60 * 60}
  ) {
    if (RefererCache.globalRefererCache) {
      throw new Error('RefererCache 已经被实例化过了！')
    }

    this.storage = store
    this.cacheTimeout = config.cacheTimeout

    RefererCache.globalRefererCache = this
  }

  public static getInstance(): RefererCache {
    if (!RefererCache.globalRefererCache) {
      throw new Error('RefererCache 还没有实例化过！')
    }

    return RefererCache.globalRefererCache
  }

  public async get(traceId: string) {
    return this.storage.get(traceId)
  }

  public async save(traceId: string, referer: string) {
    return this.storage.save(traceId, referer, this.cacheTimeout)
  }

  public async delete(traceId: string) {
    return this.storage.delete(traceId)
  }
}

export default (app: Application) => {
  const {controller, router} = app

  router.get('/health-check', controller.home.index)
  router.get('/os', controller.os.info)
  router.get('/user', 'home.render')

  app.passport.mount('github', app.config.passportGithub)
  app.passport.mount('wechat', app.config.passportWechat)
  app.router.get(
    'wechatDev.passportCallback',
    '/passport/wechat-hardway/callback',
    controller.wechatDev.passportCallback
  )
  app.router.get(
    'wechatDev.passportStart',
    '/passport/wechat-hardway',
    async (ctx, next) => {
      const referer = ctx.headers.referer

      ctx.logger.info('passport started: ', {
        query: ctx.query,
        traceId: ctx.traceId,
      })

      ctx.query.state = ctx.query.state || ctx.traceId

      await app.refererCache.save(ctx.query.state, referer)

      await next()
    }
  )
  app.passport.mount('wechat', app.config.passportHardway)
  app.passport.mount('citi', app.config.passportCiti)

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

  router.get('*', controller.home.render)
}
