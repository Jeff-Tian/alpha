import {EggPlugin} from 'egg'

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
}

export default plugin
