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

  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  alinode: {
    enable: false,
  },

  oAuth2Server: {
    enable: true,
    package: 'egg-oauth2-server',
  },
}

export default plugin
