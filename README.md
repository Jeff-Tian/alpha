# alpha

> I am Alpha, I am Omega

[![Build Status](https://travis-ci.com/Jeff-Tian/alpha.svg?branch=master)](https://travis-ci.com/Jeff-Tian/alpha)
[![codecov](https://codecov.io/gh/Jeff-Tian/alpha/branch/master/graph/badge.svg)](https://codecov.io/gh/Jeff-Tian/alpha)
[![Git commit with emojis!](https://img.shields.io/badge/gitmoji-git%20commit%20with%20emojis!-brightgreen.svg)](https://gitmoji.js.org)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FJeff-Tian%2Falpha.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FJeff-Tian%2Falpha?ref=badge_shield)

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=Jeff-Tian_alpha)](https://sonarcloud.io/dashboard?id=Jeff-Tian_alpha)

## QuickStart

### Development

```shell
nvm use v15.4.0
```

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

If you use yarn, then you can 

```shell
yarn 
yarn dev
open http://localhost:7001/ # for backend api ready
open http://localhost:10000/ # for frontend ready
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

#### to localhost

```bash
$ npm run tsc
$ npm start
```

#### to heroku

Automatically. If failed by token expired then you can update the token by

```bash
travis encrypt $(heroku auth:token) --add deploy.api_key --pro
```

Or deploy to heroku manually by

```shell
heroku login
heroku git:remote -a alpha
git push heroku master
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

- Node.js 15.4.0
- Typescript 2.8+

### Models

![Model UML Diagram](https://github.com/Jeff-Tian/alpha/releases/download/v1.0.0/models.svg)

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FJeff-Tian%2Falpha.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FJeff-Tian%2Falpha?ref=badge_large)
