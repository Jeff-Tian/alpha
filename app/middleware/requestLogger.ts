export default () => async (ctx, next) => {
  ctx.logger.info('Request Start: ', {
    query: ctx.query,
    param: ctx.param,
    body: ctx.request.body,
    path: ctx.path,
  })

  await next()

  ctx.logger.info('Request Done: ', {
    query: ctx.query,
    traceId: ctx.traceId,
    // body: ctx.request.body,
    method: ctx.method,
    // response: ctx.body,
  })
}
