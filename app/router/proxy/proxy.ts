import {Application} from 'egg'

export default (app: Application) => {
  const {controller, router} = app

  const subRouter = router.namespace('/proxy')

  subRouter.get('/', controller.proxy.proxy.get)
  subRouter.get('/convert', controller.proxy.proxy.convert)
}
