import {EggAppConfig, PowerPartial} from 'egg'
import {v4 as uuid} from 'uuid/interfaces'

export default () => {
  const config: PowerPartial<EggAppConfig> = {}

  config.passportGithub = {
    key: process.env['passport-github-key']!,
    secret: process.env['passport-github-secret']!,
    callbackURL: 'https://uniheart.herokuapp.com/passport/github/callback',
    proxy: false,
  }

  config.passportWechat = {
    clients: {
      wechat: {
        key: process.env['passport-wechat-key']!,
        secret: process.env['passport-wechat-secret']!,
        callbackURL: 'https://uniheart.herokuapp.com/passport/wechat/callback',
      },
      'wechat-hardway': {
        key: process.env['passport-wechat-key-hardway']!,
        secret: process.env['passport-wechat-secret-hardway']!,
        loginURL: 'https://uniheart.herokuapp.com/passport/wechat-hardway/',
        callbackURL:
          'https://uniheart.herokuapp.com/passport/wechat-hardway/callback',
        scope: 'snsapi_base',
        state: ctx => ctx.traceId,
      },
    },
  }

  config.passportWeapp = {
    key: process.env['passport-wechat-mini-program-hardway-key']!,
    secret: process.env['passport-wechat-mini-program-hardway-secret']!,
    successReturnToOrRedirect: '',
  }

  config.passportCiti = {
    key: process.env['passport-citi-key']!,
    secret: process.env['passport-citi-secret']!,
    callbackURL: 'https://uniheart.herokuapp.com/passport/citi/callback',
    state: app => {
      return req => {
        const state = uuid()
        // tslint:disable-next-line:no-console
        console.log('--------> state = ', state, req.headers, req.url)
        app.logger.info('state = ', {
          state,
          headers: req.headers,
          query: req.query,
          url: req.url,
        })

        return state
      }
    },
  }

  config.sequelize = {
    dialect: 'mysql',
    connectionUri: process.env.CLEARDB_DATABASE_URL,
  }

  config.alinode = {
    enable: true,
    appid: process.env['alinode-appid']!,
    secret: process.env['alinode-secret']!,
  }

  config.logger = {
    disableConsoleAfterReady: !process.env.EGG_LOGGER,
  }

  config.security = {
    csrf: {
      queryName: process.env.EGG_SECURITY_CSRF_NAME,
      bodyName: process.env.EGG_SECURITY_CSRF_CONTENT,
      ignore: '/endpoints/wechat/message',
    },
  }

  return config
}
