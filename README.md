# alpha

> I am Alpha, I am Omega

[![Build Status](https://travis-ci.com/Jeff-Tian/alpha.svg?branch=master)](https://travis-ci.com/Jeff-Tian/alpha)
[![codecov](https://codecov.io/gh/Jeff-Tian/alpha/branch/master/graph/badge.svg)](https://codecov.io/gh/Jeff-Tian/alpha)
[![Build status](https://ci.appveyor.com/api/projects/status/ghg9xa44co8h025p?svg=true)](https://ci.appveyor.com/project/Jeff-Tian/alpha)
[![Git commit with emojis!](https://img.shields.io/badge/gitmoji-git%20commit%20with%20emojis!-brightgreen.svg)](https://gitmoji.js.org)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FJeff-Tian%2Falpha.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FJeff-Tian%2Falpha?ref=badge_shield)

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=Jeff-Tian_alpha)](https://sonarcloud.io/dashboard?id=Jeff-Tian_alpha)


## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

- to localhost

```bash
$ npm run tsc
$ npm start
```

- to heroku

Automatically. If failed by token expired then you can update the token by

```bash
travis encrypt $(heroku auth:token) --add deploy.api_key --pro
```

### Check logs
```bash
heroku logs --tail -a uniheart
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FJeff-Tian%2Falpha.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FJeff-Tian%2Falpha?ref=badge_large)