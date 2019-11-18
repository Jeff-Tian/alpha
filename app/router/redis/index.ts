import {Application} from 'egg'

export default (app: Application) => {
  const {controller, router} = app

  const subRouter = router.namespace('/redis')

  subRouter.get('RedisController.index', '/', controller.redis.redis.index)
}
