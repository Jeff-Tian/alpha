import assert = require('assert')
import debug0 from 'debug'
import {Application} from 'egg'

const debug = debug0('uniheart')

export default (app: Application) => {
  app.passport.verify(async (ctx, user) => {
    const {provider, id} = user
    assert(provider, 'user.provider should exists')
    assert(id, 'user.id should exists')

    debug('============================================', ctx)
    debug('user = ', user)

    const auth = await ctx.model.Authorization.findOne({
      where: {
        uid: id,
        provider,
      },
      attributes: {
        exclude: ['id'],
      },
    })

    if (auth) {
      const {user_id} = auth
      const existedUser = await ctx.model.User.findOne({
        where: {id: user_id},
        attributes: {},
      })
      if (existedUser) {
        return existedUser
      }
    }

    return ctx.service.user.register(user)
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
