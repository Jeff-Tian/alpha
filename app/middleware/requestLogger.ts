export default () => async (ctx, next) => {
  await next()

  ctx.logger.info('Request Done: ', {
    query: ctx.query,
    traceId: ctx.traceId,
    body: ctx.request.body,
    method: ctx.method,
    response: ctx.body,
  })
}
