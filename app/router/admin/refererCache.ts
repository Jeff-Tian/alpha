import { Application } from 'egg'

export default (app: Application) => {
    const { router } = app

    const subRouter = router.namespace('/admin')

    subRouter.get('/refererCache', async (ctx) => {
        ctx.body = await app.refererCache.get(ctx.query.traceId)
    });
}
