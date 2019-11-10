import { AccessToken } from 'citi-oauth'
import { Application, Context } from 'egg'
// tslint:disable-next-line:no-submodule-imports
import fp from 'lodash/fp'

const getTokenRedisKey = (uid: string) => `access-token-citi-${uid}`

export default (app: Application) => {
  const { controller, router } = app

  const trace = fp.curry((tag, x) => {
    app.logger.info('tracing: ', { tag, x })

    return x;
  })

  const options = {
    ...app.config.passportCiti,
    getToken: fp.compose(
      trace('after converting to AccessToken'),
      (o: any) => o as AccessToken,
      trace('after app redis get'),
      app.redis.get,
      trace('after get token redis key'),
      getTokenRedisKey
    ),
    saveToken: async (uid: string, accessTokenResult: AccessToken) => {
      await app.redis.set(getTokenRedisKey(uid), accessTokenResult)
      await app.redis.expire(
        getTokenRedisKey(uid),
        accessTokenResult.expires_in
      )
    },
  }

  app.passport.mount('citi', options)
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

  const jwt = app.middleware.jwt(app.config.jwt);

  router.get(
    'citiDev.cards.list',
    '/citi-dev/cards',
    jwt,
    async (ctx: Context, next: () => Promise<void>) => {
      ctx.citiOAuthOptions = options
      await next()
    },
    controller.citiDev.cards.getList
  )
}
