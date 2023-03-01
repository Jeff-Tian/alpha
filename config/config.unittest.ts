import { EggAppConfig, PowerPartial } from 'egg'

export default () => {
  const config: PowerPartial<EggAppConfig> = {}

  config.keys = 'alpha_1559644196238_5958'

  config.passportLocal = {
    usernameField: 'username',
    // tslint:disable-next-line:no-hardcoded-credentials
    passwordField: 'password',
  }

  config.passportGithub = {
    key: process.env['passport-github-key']!,
    secret: process.env['passport-github-secret']!,
    callbackURL:
      process.env['passport-github-callback-url'] ||
      'https://uniheart.pa-ca.me/passport/github/callback',
    proxy: false,
  }

  config.passportWechat = {
    clients: {
      wechat: {
        key: 'aaa',
        secret: 'bbb',
      },
      'wechat-hardway': {
        key: 'xxx',
        secret: 'yyy',
        loginURL: '/passport/wechat-hardway/',
        callbackURL: '/passport/wechat-hardway/callback',
        scope: 'snsapi_base',
        state: ctx => {
          return ctx.traceId
        },
      },
    },
  }

  config.passportWeapp = {
    clients: {
      weapp: {
        key: 'xxx',
        secret: 'yyy',
        successReturnToOrRedirect: '',
      },
      'weapp-yiqifen': {
        key: 'xxx',
        secret: 'yyy',
        successReturnToOrRedirect: '',
      },
    },
  }

  config.passportCiti = {
    key: 'xxx',
    secret: 'yyy',
    successReturnToOrRedirect: '/passport/citi/passport-relay',
    state: app => {
      return () => {
        app.refererCache.save('4321', '1234')
          .then()

        return '4321'
      }
    },
  }

  config.sequelize = {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Sequelize: require('sequelize-typescript').Sequelize,
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'alpha',
  }

  config.alinode = {
    enable: false,
  }

  config.logger = {
    level: 'DEBUG',
    consoleLevel: 'DEBUG',
  }

  config.security = {
    csrf: {
      ignore: ctx =>
        ctx.path.startsWith('/endpoints/wechat/message') ||
        ctx.path.startsWith('/citi-dev') || ctx.path.startsWith('/proxy'),
    },
  }

  return config
}
