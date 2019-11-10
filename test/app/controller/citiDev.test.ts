import assert = require('assert')
// tslint:disable-next-line:no-submodule-imports
import { app } from 'egg-mock/bootstrap'

describe('test/app/controller/citiDev.test.ts', () => {
    it('should get cards', async () => {
        const result = await app
            .httpRequest()
            .get('/citi-dev/cards')
            .set('accept', 'application/json')
            .expect(500)

        assert.deepStrictEqual(result.body.code, "ERR_ASSERTION")
    })

})
