import {Application} from 'egg'

export default (app: Application) => {
  const {controller, router} = app

  const subRouter = router.namespace('/redis')

  // @ts-ignore
  subRouter.get('RedisController.index', '/', controller.redis.index)
}
