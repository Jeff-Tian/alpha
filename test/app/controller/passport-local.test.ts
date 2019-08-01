import assert = require('assert')
// tslint:disable-next-line:no-submodule-imports
import {app} from 'egg-mock/bootstrap'

import * as path from 'path'
import runscript = require('runscript')

const baseDir = path.resolve(__dirname, '../../..')
describe('test/app/controller/passport-local.test.ts', () => {
  before(async () => {
    await runscript('ets clean', {cwd: baseDir})
  })

  it('logs in fail by username not exist', async () => {
    assert(app.config.passportLocal!.usernameField === 'username')

    app.mockCsrf()
    const res = await app
      .httpRequest()
      .post('/passport/local')
      // tslint:disable-next-line:no-hardcoded-credentials
      .send({username: 'username', password: 'password'})
      .type('json')
      .set('Accept', 'application/json')
      .expect(422)

    assert(res.status === 422)
  })
})
