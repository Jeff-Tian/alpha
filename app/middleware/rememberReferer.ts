export default async (ctx, next) => {
  const referer = ctx.headers.referer

  ctx.logger.info('passport started: ', {
    query: ctx.query,
    traceId: ctx.traceId,
    referer,
  })

  await ctx.app.refererCache.save(ctx.query.state, referer)

  await next()
}
