import { EggAppConfig, PowerPartial } from 'egg';
import redisUrlParse from 'redis-url-parse';
import { v4 as uuid } from 'uuid';

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
        key: process.env['passport-wechat-key']!,
        secret: process.env['passport-wechat-secret']!,
        callbackURL: 'https://uniheart.herokuapp.com/passport/wechat/callback',
      },
      'wechat-hardway': {
        key: process.env['passport-wechat-key-hardway']!,
        secret: process.env['passport-wechat-secret-hardway']!,
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
        key: process.env['passport-wechat-mini-program-hardway-key']!,
        secret: process.env['passport-wechat-mini-program-hardway-secret']!,
        successReturnToOrRedirect: '',
      },

      'weapp-yiqifen': {
        key: process.env['passport-wechat-mini-program-yiqifen-key']!,
        secret: process.env['passport-wechat-mini-program-yiqifen-secret']!,
        successReturnToOrRedirect: '',
      },
    },
  };

  config.passportCiti = {
    key: process.env['passport-citi-key']!,
    secret: process.env['passport-citi-secret']!,
    callbackURL: 'https://uniheart.herokuapp.com/passport/citi/callback',
    state: app => {
      return req => {
        const state = uuid();
        const referer = req.query.redirect_uri || req.headers.referer;

        if (referer) {
          app.logger.info('referer = ', referer);

          app.refererCache.save(state, referer).then();

          app.logger.info('state = ', {
            state,
            referer: req.headers.referer,
            headers: req.headers,
            query: req.query,
            url: req.url,
          });
        }

        return state;
      };
    },
  };

  config.sequelize = {
    Sequelize: require('sequelize-typescript').Sequelize,
    dialect: 'mysql',
    connectionUri: process.env.CLEARDB_DATABASE_URL,
  };

  config.alinode = {
    enable: true,
    appid: process.env['alinode-appid']!,
    secret: process.env['alinode-secret']!,
  };

  config.logger = {
    disableConsoleAfterReady: !process.env.EGG_LOGGER,
  };

  config.security = {
    csrf: {
      queryName: process.env.EGG_SECURITY_CSRF_NAME,
      bodyName: process.env.EGG_SECURITY_CSRF_CONTENT,
      ignore: ctx =>
        ctx.path.startsWith('/endpoints/wechat/message') ||
        ctx.path.startsWith('/citi-dev'),
    },
  };

  config.jwt = {
    secret: process.env.EGG_JWT_SECRET || 'uniheart',
  };

  const redisUri = process.env.REDIS_URI;
  const parsed = redisUrlParse(redisUri);

  config.redis = {
    client: {
      port: parsed.port,
      host: parsed.host,
      password: parsed.password,
      db: parsed.database,
    },
  };

  config.oss = {
    client: {
      accessKeyId: process.env.OSS_ACCESS_KEY_ID,
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
      bucket: process.env.OSS_BUCKET,
      endpoint: process.env.OSS_ENDPOINT || 'oss-cn-shanghai.aliyuncs.com',
      timeout: process.env.OSS_TIMEOUT || '60s',
    },
  };

  return config;
};
