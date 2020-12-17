// https://umijs.org/config/
import os from 'os'
import pageRoutes from './router.config'
import webpackPlugin from './plugin.config'
import defaultSettings from '../src/defaultSettings'

export default {
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    default: 'zh-CN', // default zh-CN
    baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
  },
  // add for transfer to umi
  targets: {
    ie: 11,
  },
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  // 路由配置
  routes: pageRoutes,
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  externals: {
    '@antv/data-set': 'DataSet',
  },
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: {'^/server': ''},
    },
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    modules: {
      getLocalIdent: (context, localIdentName, localName) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName
        }
        const match = context.resourcePath.match(/src(.*)/)
        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '')
          const arr = antdProPath
            .split('/')
            .map(a => a.replace(/([A-Z])/g, '-$1'))
            .map(a => a.toLowerCase())
          return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-')
        }
        return localName
      },
    },
  },

  chainWebpack: webpackPlugin,
  cssnano: {
    mergeRules: false,
  },

  // extra configuration for egg
  runtimePublicPath: true,
  hash: true,
  outputPath: '../public',
  manifest: {
    fileName: '../../config/manifest.json',
    publicPath: '',
  },
}
