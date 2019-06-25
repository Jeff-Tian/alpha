import {EggAppConfig, EggAppInfo, PowerPartial} from 'egg'

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {}

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1559644196238_5958'

  // add your egg config in here
  config.middleware = []

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  }

  config.passportGithub = {
    key: 'your_clientID',
    secret: 'your_clientSecret',
    callbackURL: 'https://uniheart.herokuapp.com/passport/github/callback',
    proxy: false,
  }

  config.passportWechat = {
    key: 'key',
    secret: 'secret',
  }

  config.passportCiti = {
    key: 'key',
    secret: 'secret',
  }

  config.onerror = {
    all(err, ctx) {
      ctx.body = {err}
      ctx.status = 500
    },
    json(err, ctx) {
      ctx.body = err
      ctx.status = 500
    },
    html(err, ctx) {
      ctx.body = '<h3>error</h3><p>' + JSON.stringify(err) + '</p>'
      ctx.status = 500
    },
  }

  config.alinode = {
    enable: true,
    appid: process.env['alinode-appid']!,
    secret: process.env['alinode-secret']!,
  }

  config.oAuth2Server = {
    debug: true,
    grants: ['password'],
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  }
}
