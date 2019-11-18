// tslint:disable-next-line:no-submodule-imports
import {app} from 'egg-mock/bootstrap'

// tslint:disable-next-line:no-big-function
describe('test/app/controller/redis.test.ts', () => {
  it('should 200', async () => {
    await app
      .httpRequest()
      .get('/redis/')
      // tslint:disable-next-line:no-duplicate-string
      .set('accept', 'application/json')
      .expect(200)
  })
})
