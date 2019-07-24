'use strict'

module.exports = {
  write: true,
  plugin: 'autod-egg',
  prefix: '^',
  devprefix: '^',
  exclude: [
    'test/fixtures',
    'coverage',
    './dist',
    '**/*.test.js',
    '**/*.e2e.js',
  ],
  dep: ['egg', 'egg-scripts'],
  devdep: [
    'egg-ci',
    'egg-mock',
    'autod',
    'autod-egg',
    'egg-bin',
    'tslib',
    'typescript',
    'eslint',
    'eslint-config-egg',
    'webstorm-disable-index',
  ],
  keep: [],
  semver: [],
  test: ['test', 'benchmark', 'script', '.roadhogrc.mock.js'],
}
