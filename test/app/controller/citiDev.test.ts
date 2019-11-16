import assert = require('assert')
import {AccessToken} from 'citi-oauth'
// tslint:disable-next-line:no-submodule-imports
import {app} from 'egg-mock/bootstrap'
import nock from 'nock'
import {deleteTokens} from '../../../app/common/citi-helper'

describe.skip('test/app/controller/citiDev.test.ts', () => {
  afterEach(() => nock.cleanAll())
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
    // tslint:disable-next-line:no-duplicate-string
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

    nock('https://sandbox.apihub.citi.com')
      .post('/gcb/api/clientCredentials/oauth2/token/sg/gcb')
      .reply(200, {
        access_token: '1234',
        expires_in: 1800,
      })

    nock('https://sandbox.apihub.citi.com')
      .get('/gcb/api/v1/apac/onboarding/products?')
      .reply(200, {data: '1234'})

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

  it('get all onboarding products', async () => {
    const result = await app
      .httpRequest()
      .get('/citi-dev/onboarding/products')
      .set('accept', 'application/json')
      .expect(200)

    assert.deepStrictEqual(result.body, {data: '1234'})
  })

  it('should apply', async () => {
    const applied = {
      applicationId: 'ZOW9IO793854',
      applicationStage: 'PRESCREENING',
      controlFlowId:
        '6e3774334f724a2b7947663653712f52456f524c41797038516a59347a437549564a77755676376e616a733d',
    }
    nock('https://sandbox.apihub.citi.com')
      .post('/gcb/api/v1/apac/onboarding/products/unsecured/applications')
      .reply(200, applied)

    app.mockCsrf()
    const result = await app
      .httpRequest()
      .post('/citi-dev/onboarding/apply')
      .set('accept', 'application/json')
      .expect(200)

    assert.deepStrictEqual(result.body, applied)
  })
})

describe.skip('delete tokens', () => {
  afterEach(() => nock.cleanAll())
  it('delete', async () => {
    await app.redis.set(`access-token-citi-5678`, 'test')

    const res = await app.redis.get('access-token-citi-5678')
    assert(res === 'test')

    await deleteTokens(app)('')

    const res2 = await app.redis.get('access-token-citi-5678')
    assert(res2 === null)
  })
})

describe.skip('retry', () => {
  afterEach(() => nock.cleanAll())
  it('should get application status even failed once', async () => {
    nock('https://sandbox.apihub.citi.com')
      .get('/gcb/api/v1/apac/onboarding/products/unsecured/applications/1234')
      .reply(401, 'Request failed with status code 401')

    nock('https://sandbox.apihub.citi.com')
      .post('/gcb/api/clientCredentials/oauth2/token/sg/gcb')
      .reply(200, {access_token: '5678', expires_in: 18000})

    nock('https://sandbox.apihub.citi.com')
      .get('/gcb/api/v1/apac/onboarding/products/unsecured/applications/1234')
      .reply(200, {})

    await app.redis.set(
      // tslint:disable-next-line:max-line-length
      `access-token-citi-https://sandbox.apihub.citi.com/gcb/api/clientCredentials/oauth2/token/sg/gcb?grant_type=client_credentials&scope=%2Fapi`,
      JSON.stringify({
        access_token: '1234',
        expires_in: 180000,
        created_at: Date.now(),
      })
    )
    const result = await app
      .httpRequest()
      .get('/citi-dev/onboarding/get-application-status/1234')
      .set('accept', 'application/json')
      .expect(200)

    assert.deepStrictEqual(result.body, {})
  })
})
