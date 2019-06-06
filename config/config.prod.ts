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
    clientID: process.env['passport-wechat-key']!,
    clientSecret: process.env['passport-wechat-secret']!,
  }

  return config
}
