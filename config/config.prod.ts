import {EggAppConfig, PowerPartial} from 'egg'

export default () => {
  const config: PowerPartial<EggAppConfig> = {}

  config.passportGithub = {
    key: process.env['passport-github-key'] || 'prod_clientID',
    secret: process.env['passport-github-secret'] || 'prod_clientSecret',
    callbackURL: '/passport/github/callback',
    proxy: false,
  }

  return config
}
