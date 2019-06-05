import {Application} from 'egg'

export default (app: Application) => {
  const {controller, router} = app

  router.get('/health-check', controller.home.index)
  router.get('/', controller.home.render)
  app.router.get('/user', 'home.render')

  app.passport.mount('github')

  app.router.get('/logout', 'user.logout')
}
