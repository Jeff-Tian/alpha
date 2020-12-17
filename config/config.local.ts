import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.passportGithub = {
    key: process.env['passport-github-key']!,
    secret: process.env['passport-github-secret']!,
    callbackURL: 'https://uniheart.herokuapp.com/passport/github/callback',
    proxy: false,
  };

  config.passportWechat = {
    clients: {
      wechat: {
        key: process.env['passport-wechat-key'] || 'xxx',
        secret: process.env['passport-wechat-secret'] || 'yyy',
      },
      'wechat-hardway': {
        key: process.env['passport-wechat-key-hardway'] || 'xxxx',
        secret: process.env['passport-wechat-secret-hardway'] || 'yyyy',
        loginURL: 'https://uniheart.herokuapp.com/passport/wechat-hardway/',
        callbackURL:
          'https://uniheart.herokuapp.com/passport/wechat-hardway/callback',
        scope: 'snsapi_base',
        state: ctx => ctx.traceId,
      },
    },
  };

  config.passportWeapp = {
    clients: {
      weapp: {
        key: 'xxx',
        secret: 'yyy',
      },
    },
  };

  config.sequelize = {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Sequelize: require('sequelize-typescript').Sequelize,
    dialect: 'mysql',
    connectionUri:
      process.env.CLEARDB_DATABASE_URL || 'mysql://root:@127.0.0.1:3306/alpha',
  };

  config.alinode = {
    enable: false,
    appid: 'xxx',
    secret: 'yyy',
  };

  config.security = {
    csrf: {
      queryName: '_csrf',
      bodyName: 'uniheart',
    },
  };

  return config;
};
