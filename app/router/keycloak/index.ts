import { Application } from 'egg'

export default (app: Application) => {
  const { router } = app

  const subRouter = router.namespace('/keycloak')

  subRouter.get(
    'keycloak.login',
    '/login',
    app.keycloak.protect(),
    async ctx => {
      ctx.body = ctx.session['keycloak-token']
    },
  )

  subRouter.get('keycloak.*', '/*', app.keycloak.checkSso(), async ctx => {
    ctx.body = 'Keycloak resource. ' + ctx.session['keycloak-token']
  })
}
