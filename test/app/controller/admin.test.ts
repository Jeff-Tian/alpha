import assert = require('assert')
// tslint:disable-next-line:no-submodule-imports
import {app} from 'egg-mock/bootstrap'

describe('test/app/controller/admin.test.ts', () => {
  it('should throw error', async () => {
    await app
      .httpRequest()
      .get('/admin/test')
      .expect(500)
  })
})
