import {EggAppConfig, PowerPartial} from 'egg'

export default () => {
  const config: PowerPartial<EggAppConfig> = {}

  config.passportGithub = {
    key: process.env['passport-github-key']!,
    secret: process.env['passport-github-secret']!,
    callbackURL: 'https://uniheart.herokuapp.com/passport/github/callback',
    proxy: false,
  }

  config.passportWechat = {
    key: process.env['passport-wechat-key']!,
    secret: process.env['passport-wechat-secret']!,
    callbackURL: 'https://uniheart.herokuapp.com/passport/wechat/callback',
  }

  config.passportHardway = {
    key: process.env['passport-wechat-key-hardway']!,
    secret: process.env['passport-wechat-secret-hardway']!,
  }

  config.passportCiti = {
    key: process.env['passport-citi-key']!,
    secret: process.env['passport-citi-secret']!,
    callbackURL: 'https://uniheart.herokuapp.com/passport/citi/callback',
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
    },
  }

  return config
}
