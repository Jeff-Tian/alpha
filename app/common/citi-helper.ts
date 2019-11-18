import CitiOAuth, {AccessToken} from 'citi-oauth'
import R from 'ramda'

export const getInstance = ctx =>
  new CitiOAuth(
    ctx.citiOAuthOptions.key,
    ctx.citiOAuthOptions.secret,
    ctx.citiOAuthOptions.successReturnToOrRedirect,
    ctx.citiOAuthOptions.saveToken,
    ctx.citiOAuthOptions.getToken,
    ctx.logger
  )

export const getTokenRedisKey = (uid: string) => `access-token-citi-${uid}`

export const getToken = app =>
  R.compose(
    async (s: string) => app.redis.get(s),
    getTokenRedisKey
  )

export const saveToken = app => async (
  uid: string,
  accessTokenResult: AccessToken
) => {
  app.logger.info('saving token by ...', {uid, accessTokenResult})
  await app.redis.set(getTokenRedisKey(uid), JSON.stringify(accessTokenResult))
  await app.redis.expire(
    getTokenRedisKey(uid),
    Math.floor(accessTokenResult.expires_in / 1000)
  )
  app.logger.info('saved token by ...', {uid, accessTokenResult})
}

export const deleteTokens = app => async (uid: string) => {
  const pattern = getTokenRedisKey(uid)
  const keys = (await app.redis.keys(pattern)) || []
  app.logger.info('redis keys = ', {keys, pattern})

  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < keys.length; i++) {
    app.logger.info('deleting ... ', {key: keys[i]})
    // await app.redis.del(keys[i])
    app.logger.info('deleted ... ', {key: keys[i]})
  }

  // await Promise.all(
  //   keys.map(async (key: string) => {
  //     app.logger.info('deleting ... ', {key})
  //     await app.redis.del(key)
  //     app.logger.info('deleted ...', {key})
  //   })
  // )
  app.logger.info('deleted all ', {
    keys: (await app.redis.keys(pattern)) || [],
  })
}

export const retryHandlers = app => [
  {
    error: /Request failed with status code 401/,
    handler: async () => {
      // tslint:disable-next-line:no-console
      console.log('handling...............................................')
      const asyncDeleteTokens = deleteTokens(app)
      await asyncDeleteTokens('')
      // tslint:disable-next-line:no-console
      console.log('handled.')
    },
  },
]
