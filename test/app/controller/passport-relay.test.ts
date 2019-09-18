import assert = require('assert')
// tslint:disable-next-line:no-submodule-imports
import {app} from 'egg-mock/bootstrap'
import nock from 'nock'

describe('test/app/controller/passport-relay.test.ts', () => {
  it('should redirect after successfully login by citi account', async () => {
    // tslint:disable-next-line: no-commented-code
    // const ctx = app.mockContext({})

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
        emails: [{emailAddress: 'jie.tian@hotmail.com' + Date.now()}],
        customerParticulars: {
          names: [{fullName: 'jie.tian'}],
        },
      })

    await app
      .httpRequest()
      .get('/passport/citi/callback?code=1234')
      .expect(302)

    // assert(ctx.isAuthenticated())
  })
  it('should return token', async () => {
    const response = await app
      .httpRequest()
      .get('/passport/citi')
      .expect(302)

    assert(
      response.headers.location.startsWith(
        // tslint:disable-next-line:max-line-length
        'https://sandbox.apihub.citi.com/gcb/api/authCode/oauth2/authorize?response_type=code&client_id=xxx&scope=customers_profiles&countryCode=SG&businessCode=GCB&locale=en_US&state=4321'
      )
    )

    assert((await app.refererCache.get('4321')) === '1234')
  })
})
