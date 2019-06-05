import {EggAppConfig, PowerPartial} from 'egg'

export default () => {
  const config: PowerPartial<EggAppConfig> = {}

  config.passportGithub = {
    key: process.env['passport-github-key'] || '',
    secret: process.env['passport-github-secret'] || '',
    // callbackURL: '/passport/github/callback',
    // proxy: false,
  }

  return config
}
