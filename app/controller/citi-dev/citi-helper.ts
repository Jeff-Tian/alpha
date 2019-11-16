import CitiOAuth from 'citi-oauth'

export const getInstance = ctx =>
  new CitiOAuth(
    ctx.citiOAuthOptions.key,
    ctx.citiOAuthOptions.secret,
    ctx.citiOAuthOptions.successReturnToOrRedirect,
    ctx.citiOAuthOptions.saveToken,
    ctx.citiOAuthOptions.getToken,
    ctx.logger
  )
