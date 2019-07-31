import assert = require('assert')
// tslint:disable-next-line:no-submodule-imports
import {app} from 'egg-mock/bootstrap'

describe('test/app/controller/passport-local.test.ts', () => {
  it('should login', async () => {
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
