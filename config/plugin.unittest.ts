import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },

  alinode: {
    enable: false,
  },

  redis: {
    enable: true,
  },
};

export default plugin;
