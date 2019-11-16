import assert = require('assert')
import mm from 'egg-mock'
import nock from 'nock'
import path from 'path'
import runscript = require('runscript')

const baseDir = path.resolve(__dirname, '../..')

describe('test/passport-wechat-hardway.test.ts', () => {
  before(async () => {
    await runscript('ets', {cwd: baseDir})
    await runscript(`tsc -p ${baseDir}/tsconfig.json`, {cwd: baseDir})
  })

  after(async () => {
    await runscript('ets clean', {cwd: baseDir})
  })

  describe('compiling code and run tests', () => {
    afterEach(() => {
      nock.cleanAll()
      mm.restore()
    })

    let app

    before(async () => {
      app = mm.app({
        baseDir: '../..',
      })

      return app.ready()
    })

    it('saves referer', async () => {
      app.mockContext({
        traceId: '1234',
      })

      const runningApp = app.httpRequest()

      const res = await runningApp
        .get('/passport/wechat-hardway')
        .set('referer', 'https://www.baidu.com')
        .expect(302)

      assert(res.text === 'Found')
      assert(
        // tslint:disable-next-line:max-line-length
        `https://open.weixin.qq.com/connect/oauth2/authorize?appid=xxx&redirect_uri=%2Fpassport%2Fwechat-hardway%2Fcallback&response_type=code&scope=snsapi_base&state=1234#wechat_redirect` ===
          res.headers.location
      )

      nock('https://api.weixin.qq.com')
        .get(
          '/sns/oauth2/access_token?appid=xxx&secret=yyy&code=5678&grant_type=authorization_code'
        )
        .reply(200, {})

      await runningApp
        .get(`/passport/wechat-hardway/callback?code=5678&state=${1234}`)
        .expect(200)
    })
  })
})
