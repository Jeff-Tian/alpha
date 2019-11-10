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

})
