import {EggAppConfig, PowerPartial} from 'egg'

export default () => {
  const config: PowerPartial<EggAppConfig> = {}

  config.passportLocal = {
    usernameField: 'username',
    // tslint:disable-next-line:no-hardcoded-credentials
    passwordField: 'password',
  }

  config.passportGithub = {
    key: process.env['passport-github-key']!,
    secret: process.env['passport-github-secret']!,
    callbackURL: 'https://uniheart.herokuapp.com/passport/github/callback',
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
        callbackURL: 'https://localhost:7001/passport/wechat-hardway/callback',
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
      },
      'weapp-yiqifen': {
        key: 'xxx',
        secret: 'yyy',
      },
    },
  }

  config.passportCiti = {
    key: 'xxx',
    secret: 'yyy',
    successReturnToOrRedirect: '/passport/citi/passport-relay',
    state: app => {
      return () => {
        app.refererCache.save('4321', '1234').then()

        return '4321'
      }
    },
  }

  config.sequelize = {
    dialect: 'mysql',
    connectionUri: 'mysql://root:@127.0.0.1:3306/alpha',
  }

  config.alinode = {
    enable: false,
  }

  return config
}
