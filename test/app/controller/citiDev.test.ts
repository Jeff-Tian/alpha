import assert = require('assert')
// tslint:disable-next-line:no-submodule-imports
import { app } from 'egg-mock/bootstrap'

describe('test/app/controller/citiDev.test.ts', () => {
    it('should fail with 401 if not logged in', async () => {
        const result = await app
            .httpRequest()
            .get('/citi-dev/cards')
            .set('accept', 'application/json')
            .expect(401)

        assert.deepStrictEqual(result.body.code, 'credentials_required')
    })

    it('gets user\'s token', async () => {
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
})
