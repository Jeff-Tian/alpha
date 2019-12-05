import { Context } from 'egg';

export const injectCitiOAuthOptions = app => async (
  ctx: Context,
  next: () => Promise<void>,
) => {
  ctx.citiOAuthOptions = app.config.passportCiti;
  await next();
};
