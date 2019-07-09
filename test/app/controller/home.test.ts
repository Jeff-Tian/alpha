import assert from 'assert'
// tslint:disable-next-line:no-submodule-imports
import {app} from 'egg-mock/bootstrap'

describe('test/app/controller/home.test.ts', () => {
  it('should GET /', async () => {
    const result = await app
      .httpRequest()
      .get('/')
      .expect(200)
    assert(result.text.match(/Home/))
  })

  it('should be health', async () => {
    const result = await app
      .httpRequest()
      .get('/health-check')
      .expect(200)

    assert(JSON.parse(result.text).NODE_ENV === 'test')
  })
})
