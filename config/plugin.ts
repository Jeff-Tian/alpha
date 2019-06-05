import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
    // static: true,
    // nunjucks: {
    //   enable: true,
    //   package: 'egg-view-nunjucks',
    // },

    passport: {
        enable: true,
        package: 'egg-passport-x',
    },

    passportGithub: {
        enable: true,
        package: 'egg-passport-github',
    },
};

export default plugin;
