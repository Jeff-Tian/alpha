import { Application } from 'egg'

export default (app: Application) => {
    const { router } = app

    const subRouter = router.namespace('/admin')

    subRouter.get('/refererCache', async (ctx) => {
        ctx.body = { size: app.refererCache.size, [ctx.query.traceId]: await app.refererCache.get(ctx.query.traceId) }
    });

    subRouter.get('/test', async (ctx) => {
        ctx.app.refererCache.save('1234', '4321')

        ctx.body = { size: app.refererCache.size, [ctx.query.traceId]: await app.refererCache.get(ctx.query.traceId) }
    })
}
