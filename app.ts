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

    return user

    // tslint:disable-next-line:no-commented-code
    // const auth = await ctx.model.Authorization.findOne({
    //   uid: id,
    //   provider,
    // })
    //
    // if (auth) {
    //   const {user_id} = auth
    //   const existedUser = await ctx.model.User.findOne({id: user_id})
    //   if (existedUser) {
    //     return existedUser
    //   }
    // }
    //
    // return ctx.service.user.register(user)
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
