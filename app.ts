import assert = require('assert')
import {Application} from 'egg'

export default (app: Application) => {
  app.passport.verify(async (ctx, user) => {
    assert(user.provider, 'user.provider should exists')
    // assert(user.id, 'user.id should exists')

    ctx.logger.info('user = ', user)

    return user
  })

  // tslint:disable-next-line:no-commented-code
  // app.passport.serializeUser(async (ctx, user) => {
  //   ctx.logger.info('serialzing User: ', user)
  // })
  //
  // app.passport.deserializeUser(async (ctx, user) => {
  //   ctx.logger.info('deserializing User: ', user)
  // })
}
