import { Application } from 'egg'

export default (app: Application) => {
    const { controller, router } = app

    const subRouter = router.namespace('/jwt')

    const jwt = app.middleware.jwt(app.config.jwt);

    subRouter.get('/', jwt, controller.jwt.index);
    subRouter.get('/login', controller.jwt.login);
    subRouter.get('/success', jwt, controller.jwt.success);
    subRouter.get('/unauthorerror', jwt, controller.jwt.unauthorerror);
}
