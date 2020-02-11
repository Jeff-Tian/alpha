import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import path from 'path';
import { v4 as uuid } from 'uuid';

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {};

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1559644196238_5958';

  // add your egg config in here
  config.middleware = ['notfoundHandler', 'requestLogger'];

  // add your special config in here
  const bizConfig = {
    sourceUrl: 'https://github.com/Jeff-Tian/alpha',
  };

  config.passportLocal = {
    usernameField: process.env.passportLocalUserName!,
    passwordField: process.env.passportLocalPassword!,
  };

  config.passportGithub = {
    key: 'your_clientID',
    secret: 'your_clientSecret',
    callbackURL: 'https://uniheart.herokuapp.com/passport/github/callback',
    proxy: false,
  };

  config.passportWechat = {
    key: 'key',
    secret: 'secret',
  };

  config.passportCiti = {
    key: 'key',
    secret: 'secret',
    successReturnToOrRedirect: '/passport/citi/passport-relay',
    state: () => uuid,
  };

  config.alinode = {
    enable: false,
    appid: process.env['alinode-appid']!,
    secret: process.env['alinode-secret']!,
  };

  config.oAuth2Server = {
    debug: true,
    grants: ['password', 'client_credentials'],
  };

  config.bodyParser = {
    enable: true,
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      text: ['text/xml', 'application/xml'],
    },
    jsonLimit: '1mb',
    formLimit: '1mb',
  };

  config.multipart = {
    mode: 'stream',
    fileExtensions: ['.docx', '.xlsx', '.pptx', '.doc', '.xls', '.ppt'],
  };

  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    mapping: {
      '.pug': 'pug',
    },
  };

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
  };

  config.security = {};

  config.cors = {
    origin: '*',
    allowMethods: 'GET',
  };

  config.refererCache = {
    timeout: 1000 * 60 * 60,
  };

  config.jwt = {
    secret: '123456',
  };

  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0,
    },
  };

  config.errorDisplay = {
    isProd: () => process.env.isPord === 'true',
    // tslint:disable-next-line:no-empty
    serializer: () => { },
  };

  config.oss = {
    client: {
      accessKeyId: 'xxx',
      accessKeySecret: 'yyy',
      bucket: 'libre-office',
      endpoint: 'oss-cn-shanghai.aliyuncs.com',
      timeout: '60s',
    },
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
