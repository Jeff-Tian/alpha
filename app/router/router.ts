import {Application} from 'egg'

export default (app: Application) => {
  const {controller, router} = app

  router.get('/health-check', controller.home.index)
  router.get('/os', controller.os.info)
  router.get('/user', 'home.render')

  app.passport.mount('github', app.config.passportGithub)

  const localStrategy = app.passport.authenticate('local')
  app.router.post('/passport/local', localStrategy)

  router.get('/logout', 'user.logout')

  router.resources('users', '/users', controller.users)

  app.all('/user/token', app.oAuth2Server.token())
  app.get('/user/authorize', app.oAuth2Server.authorize(), 'user.code')
  app.get(
    '/user/authenticate',
    app.oAuth2Server.authenticate(),
    'user.authenticate'
  )

  if (app.config.env === 'prod') {
    router.get('/api/currentUser', controller.user.current)
  } else {
    router.all('/api/*', controller.home.proxy)
  }

  router.get('/', controller.home.render)

  router.get('*', controller.home.render)
}
