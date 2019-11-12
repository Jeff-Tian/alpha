import assert = require('assert')
// tslint:disable-next-line:no-submodule-imports
import {app} from 'egg-mock/bootstrap'
import nock = require('nock')
import {AccessToken} from 'citi-oauth'

describe('test/app/controller/citiDev.test.ts', () => {
  it('should fail with 401 if not logged in', async () => {
    const result = await app
      .httpRequest()
      .get('/citi-dev/cards')
      // tslint:disable-next-line:no-duplicate-string
      .set('accept', 'application/json')
      .expect(401)

    assert.deepStrictEqual(result.body.code, 'credentials_required')
  })

  it("gets user's token", async () => {
    await app.redis.set(`access-token-citi-1234`, 'test')

    const res = await app.redis.get('access-token-citi-1234')
    assert(res === 'test')

    const result = await app
      .httpRequest()
      .get('/citi-dev/token?uid=1234')
      .set('accept', 'application/json')
      .expect(200)

    assert(result.body, 'test')
  })

  it('saves the token', async () => {
    nock('https://sandbox.apihub.citi.com')
      .post('/gcb/api/authCode/oauth2/token/sg/gcb')
      .reply(200, {
        access_token: '123456',
        expires_in: 1800,
        scope: 'customers_profiles',
      })

    nock('https://sandbox.apihub.citi.com')
      .get('/gcb/api/v1/customers/profiles')
      .reply(200, {
        emails: [{emailAddress: 'jie.tian@hotmail.com'}],
      })

    const result = await app
      .httpRequest()
      .get('/passport/citi/callback?code=1234')
      .set('accept', 'application/json')
      .expect(302)

    assert(
      result.text ===
        'Redirecting to /passport/citi/passport-relay?state=undefined.'
    )

    const res = await app.redis.get('access-token-citi-jie.tian@hotmail.com')
    assert.deepStrictEqual(
      (JSON.parse(res!) as AccessToken).access_token,
      '123456'
    )
  })
})
