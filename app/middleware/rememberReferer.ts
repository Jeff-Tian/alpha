export default async (ctx, next) => {
  const referer = ctx.headers.referer

  ctx.logger.info('passport started: ', {
    query: ctx.query,
    traceId: ctx.traceId,
  })

  await ctx.app.refererCache.save(ctx.traceId, referer)

  await next()
}
