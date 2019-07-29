import {EggAppConfig, EggAppInfo, PowerPartial} from 'egg'
import * as path from 'path'

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

  config.passportLocal = {
    usernameField: 'username',
    passwordField: 'password',
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
    enable: false,
    appid: process.env['alinode-appid']!,
    secret: process.env['alinode-secret']!,
  }

  config.oAuth2Server = {
    debug: true,
    grants: ['password', 'client_credentials'],
  }

  config.bodyParser = {
    enable: true,
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      text: ['text/xml', 'application/xml'],
    },
  }

  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    mapping: {
      '.pug': 'pug',
    },
  }

  config.assets = {
    publicPath: '/public',
    devServer: {
      autoPort: true,
      command: 'umi dev --port={port}',
      env: {
        APP_ROOT: path.join(__dirname, '../app/web'),
        BROWSER: 'none',
        SOCKET_SERVER: 'http://127.0.0.1:{port}',
      },
      debug: true,
    },
  }

  config.security = {}

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  }
}
