import CitiOAuth, {AccessToken} from 'citi-oauth'
// tslint:disable-next-line:no-submodule-imports
// import fp from 'lodash/fp'

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

// tslint:disable-next-line:no-commented-code
// export const getToken = app =>
//   fp.compose(
//     (o: any) => o as AccessToken,
//     async (s: string) => {
//       app.logger.info('getting token by ...', {s})
//       const token = await app.redis.get(s)
//       app.logger.info('got token by ...', {s, token})
//       return token
//     },
//     getTokenRedisKey
//   )

export const getToken = app => async (uid: string) => {
  const s = getTokenRedisKey(uid)
  app.logger.info('getting token by ...', {s})
  const token = await app.redis.get(s)
  app.logger.info('got token by ...', {s, token})
  return token
}

export const saveToken = app => async (
  uid: string,
  accessTokenResult: AccessToken
) => {
  await app.redis.set(getTokenRedisKey(uid), JSON.stringify(accessTokenResult))
  await app.redis.expire(getTokenRedisKey(uid), accessTokenResult.expires_in)
}

export const deleteTokens = app => async (uid: string) => {
  const pattern = getTokenRedisKey(uid) + '*'
  const keys = (await app.redis.keys(pattern)) || []
  app.logger.info('redis keys = ', {keys, pattern})

  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < keys.length; i++) {
    app.logger.info('deleting ... ', {key: keys[i]})
    await app.redis.del(keys[i])
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
