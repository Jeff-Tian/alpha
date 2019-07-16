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

  describe('compiling code', () => {
    afterEach(mm.restore)

    let app

    before(async () => {
      app = mm.app({
        baseDir: '../..',
      })

      return app.ready()
    })

    after(async () => {
      app.close()

      assert.deepStrictEqual(app._app._backgroundTasks, [])
    })

    it.skip('post xml', async () => {
      const ctx = app.mockContext()
      const res = await ctx.curl(
        'localhost:7001/v2/user/oauth/wechat/receive',
        {
          type: 'POST',
          contentType: 'application/xml',
          dataType: 'application/json',
          content: '<xml></xml>',
        }
      )

      assert(res.status === 200)
      assert(res.data.message === '<xml></xml>')
    })
  })
})
