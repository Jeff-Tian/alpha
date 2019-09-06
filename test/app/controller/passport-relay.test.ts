import assert = require('assert')
// tslint:disable-next-line:no-submodule-imports
import {app} from 'egg-mock/bootstrap'
import nock from 'nock'

describe('test/app/controller/passport-relay.test.ts', () => {
  it('should show token', async () => {
    nock('https://sandbox.apihub.citi.com')
      .post('/gcb/api/authCode/oauth2/token/sg/gcb')
      .reply(200, {
        scope: 'customers_profiles',
        access_token: '123',
        refresh_token: '123',
        expires_in: new Date(),
      })

    nock('https://sandbox.apihub.citi.com')
      .get('/gcb/api/v1/customers/profiles')
      .reply(200, {
        emails: [{emailAddress: 'jie.tian@hotmail.com'}],
      })

    const result = await app
      .httpRequest()
      .get('/passport/citi/callback?code=1234')
      .expect(200)

    assert.deepStrictEqual(result.body, {
      token: '1234',
    })
  })
})
