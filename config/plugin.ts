import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },

  passport: {
    enable: true,
    package: 'egg-passport',
  },

  passportLocal: {
    enable: true,
    package: 'egg-passport-local',
  },

  passportGithub: {
    enable: true,
    package: 'egg-passport-github',
  },

  passportWechat: {
    enable: true,
    package: 'egg-passport-wechat-ts',
  },

  passportCiti: {
    enable: true,
    package: 'egg-passport-citi',
  },

  passportWeapp: {
    enable: true,
    package: 'egg-passport-weapp',
  },

  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  alinode: {
    enable: true,
    package: 'egg-alinode',
  },

  oAuth2Server: {
    enable: true,
    package: 'egg-oauth2-server',
  },

  view: {
    enable: true,
    package: 'egg-view',
  },

  pug: {
    enable: true,
    package: 'egg-view-pug',
  },

  useragent: {
    enable: true,
    package: 'egg-useragent-ts',
  },

  assets: {
    enable: true,
    package: 'egg-view-assets',
  },

  cors: {
    enable: true,
    package: 'egg-cors',
  },

  tracer: {
    enable: true,
    package: 'egg-tracer',
  },

  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },

  jwt: {
    enable: true,
    package: 'egg-jwt'
  },

  redis: {
    enable: true,
    package: 'egg-redis'
  }
}

export default plugin
