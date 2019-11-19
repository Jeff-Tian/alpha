import assert = require('assert')
// tslint:disable-next-line:no-submodule-imports
import {app} from 'egg-mock/bootstrap'

describe('test/app/controller/proxy.test.ts', () => {
  it('should proxy html', async () => {
    const res = await app
      .httpRequest()
      .get(`/proxy?url=${encodeURIComponent('https://www.baidu.com')}`)
      // tslint:disable-next-line:no-duplicate-string
      .expect(200)

    assert(res.text.includes('</html>'))
  })
})
