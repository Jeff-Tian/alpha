import assert = require('assert')
import mm from 'egg-mock'
import * as path from 'path'
import runscript = require('runscript')

const baseDir = path.resolve(__dirname, '../..')

describe('test/passport-weapp-hardway.test.ts', () => {
  before(async () => {
    await runscript('ets', {cwd: baseDir})
    await runscript(`tsc -p ${baseDir}/tsconfig.json`, {cwd: baseDir})
  })

  after(async () => {
    await runscript('ets clean', {cwd: baseDir})
  })

  describe('compiling code and run tests', () => {
    afterEach(mm.restore)

    let app

    before(async () => {
      app = mm.app({
        baseDir: '../..',
      })

      assert(app.config.env === 'unittest')

      return app.ready()
    })

    it.skip('callback', async () => {
      app.mockContext({
        traceId: '1234',
      })

      const runningApp = app.httpRequest()

      await runningApp
        .get(`/passport/weapp/callback?code=5678&state=${1234}`)
        .expect(200)
    })
  })
})
