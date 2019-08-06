import assert = require('assert')
import debug0 from 'debug'
import {Application} from 'egg'
import {MemoryStorage} from './app/controller/wechat-dev'
import {RefererCache} from './app/router'

const debug = debug0('uniheart')

export default (app: Application) => {
  app.refererCache = new RefererCache(
    new MemoryStorage(),
    app.config.refererCache
  )

  app.passport.verify(async (ctx, user) => {
    debug('user = ', user)
    const {provider, id, username, password} = user
    assert(provider, 'user.provider should exists')
    if (provider === 'local') {
      assert(username, 'user.userusername should exists')
      assert(password, 'user.password should exists')
    } else {
      assert(id, 'user.id should exists')
    }

    const auth = await ctx.model.Authorization.findOne({
      where:
        provider === 'local'
          ? {
              username,
              password,
              provider,
            }
          : {
              uid: id,
              provider,
            },
      attributes: {
        exclude: ['id'],
      },
    })

    if (auth) {
      const {user_id} = auth

      await ctx.model.Authorization.update(
        {
          user_id,
          updated_at: new Date(),
          profile: user.profile.toString(),
        },
        {
          where: {provider, uid: id},
        }
      )

      const existedUser = await ctx.model.User.findOne({
        where: {id: user_id},
        attributes: {},
      })
      if (existedUser) {
        return user
      }
    }

    if (provider === 'local') {
      ctx.throw(422, '用户名或者密码错误！', user)
    } else {
      return ctx.service.user.register(user)
    }
  })

  // tslint:disable-next-line:no-commented-code
  // app.passport.serializeUser(async (ctx, user) => {
  //   ctx.logger.info('serialzing User: ', user)
  // })
  //
  // app.passport.deserializeUser(async (ctx, user) => {
  //   ctx.logger.info('deserializing User: ', user)
  // })
  //
  // app.on('error', (err, ctx) => {
  //   ctx.logger.error(err)
  // })

  // @ts-ignore
  process.on('unhandledRejection', error => {
    // Will print "unhandledRejection err is not defined"
    // console.error('unhandledRejection --> ', error)

    throw error
    // process.exit(1)
  })
}
