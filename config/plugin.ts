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
}

export default plugin
