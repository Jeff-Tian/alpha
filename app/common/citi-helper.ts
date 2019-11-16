import CitiOAuth, {AccessToken} from 'citi-oauth'
// tslint:disable-next-line:no-submodule-imports
import fp from 'lodash/fp'

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
  fp.compose(
    (o: any) => o as AccessToken,
    async (s: string) => app.redis.get(s),
    getTokenRedisKey
  )

export const saveToken = app => async (
  uid: string,
  accessTokenResult: AccessToken
) => {
  await app.redis.set(getTokenRedisKey(uid), JSON.stringify(accessTokenResult))
  await app.redis.expire(getTokenRedisKey(uid), accessTokenResult.expires_in)
}

const deleteTokens = app => async (uid: string) => {
  const keys = (await app.redis.keys(getTokenRedisKey(uid) + '*')) || []
  await Promise.all(keys.map(async (key: string) => app.redis.del(key)))
}

export const retryHandlers = app => [
  {
    error: /Request failed with status code 401/,
    handler: async () => {
      await deleteTokens(app)('')
    },
  },
]
