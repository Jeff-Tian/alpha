import assert = require('assert')
import mm from 'egg-mock'
import path from 'path'
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

    // after(async () => {
    //   app.close()
    //
    //   assert.deepStrictEqual(app._app._backgroundTasks, [])
    // })

    it('should show login tips when user unauthenticated', () => {
      return app
        .httpRequest()
        .get('/')
        .expect(/uniheart | I am Alpha, I am Omega/)
        .expect(200)
    })

    it('should show authenticated user info', () => {
      app.mockUser()

      return app
        .httpRequest()
        .get('/')
        .expect(/Logged in user:/)
        .expect(/mock displayName \/ 10086/)
        .expect(200)
    })

    it.skip('should get mock authenticated user context', async () => {
      const ctx = app.mockUserContext()
      assert(ctx.user)
      assert(ctx.user.id === '10086')
      assert(ctx.user.provider === 'mock')
      assert(ctx.isAuthenticated() === true)

      const user = await ctx.service.user.find()
      assert(user)
    })

    it('should redirect to github oauth url', () => {
      return app
        .httpRequest()
        .get('/passport/github')
        .expect(/Found/)
        .expect(
          'Location',
          /https:\/\/github.com\/login\/oauth\/authorize\?response_type=code&redirect_uri=https/
        )
        .expect(302)
    })

    // tslint:disable-next-line:no-identical-functions
    it('should GET callback also redirect to github oauth url', () => {
      return app
        .httpRequest()
        .get('/passport/github/callback')
        .expect(/Found/)
        .expect('Location', /https:\/\//)
        .expect(302)
    })

    it('should redirect to wechat oauth url', () => {
      return app
        .httpRequest()
        .get('/passport/wechat')
        .expect(302)
    })
  })
})
