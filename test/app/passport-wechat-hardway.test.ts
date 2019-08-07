import assert = require('assert')
import mm from 'egg-mock'
import * as path from 'path'
import runscript = require('runscript')

const baseDir = path.resolve(__dirname, '../..')

describe('test/app.test.ts', () => {
  before(async () => {
    await runscript('ets', {cwd: baseDir})
    await runscript(`tsc -p ${baseDir}/tsconfig.json`, {cwd: baseDir})
  })

  after(async () => {
    await runscript('ets clean', {cwd: baseDir})
  })

  describe('compiling code', () => {
    afterEach(mm.restore)

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

      const res = await app
        .httpRequest()
        .get('/passport/wechat-hardway')
        .expect(302)

      assert(res.text === 'Found')
      assert(
        // tslint:disable-next-line:max-line-length
        `https://open.weixin.qq.com/connect/oauth2/authorize?appid=key&redirect_uri=%2Fpassport%2Fwechat-hardway%2Fcallback&response_type=code&scope=snsapi_base&state=${1234}#wechat_redirect` ===
          res.headers.location
      )
    })
  })
})
