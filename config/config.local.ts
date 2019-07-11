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
  }

  config.sequelize = {
    dialect: 'mysql',
    connectionUri: 'mysql://root:@127.0.0.1:3306/alpha',
  }

  config.alinode = {
    enable: false,
    appid: 'xxx',
    secret: 'yyy',
  }

  config.security = {
    csrf: {
      queryName: '_csrf',
      bodyName: 'uniheart',
    },
  }

  return config
}
