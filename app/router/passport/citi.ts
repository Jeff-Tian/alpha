import {Application} from 'egg'

export default (app: Application) => {
  // tslint:disable-next-line:no-console
  console.log('asdfjdjsklj;asdfladsfj')
  const {controller, router} = app

  app.passport.mount('citi', app.config.passportCiti)
  router.get('/passport/citi/callback', controller.passportRelay.relay)

  router.get('/test', ctx => {
    ctx.body = 'hello'
  })
}
