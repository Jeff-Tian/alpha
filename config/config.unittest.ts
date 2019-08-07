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
    key: process.env['passport-wechat-key']!,
    secret: process.env['passport-wechat-secret']!,
  }

  config.passportHardway = {
    key: 'xxx',
    secret: 'yyy',
    loginURL: '/passport/wechat-hardway/',
    callbackURL: '/passport/wechat-hardway/callback',
    scope: 'snsapi_base',
    state: ctx => {
      return ctx.traceId
    },
  }

  config.sequelize = {
    dialect: 'mysql',
    connectionUri: 'mysql://root:@127.0.0.1:3306/alpha',
  }

  config.onerror = {
    all(err, ctx) {
      ctx.body = {err}
    },
    json(err, ctx) {
      ctx.body = err
    },
    html(err, ctx) {
      ctx.body = '<h3>error</h3><p>' + JSON.stringify(err) + '</p>'
    },
  }

  config.alinode = {
    enable: false,
  }

  return config
}
