export default async (ctx, next) => {
  const referer = ctx.headers.referer;
  await ctx.app.refererCache.save(ctx.query.state, referer);
  await next();
};
