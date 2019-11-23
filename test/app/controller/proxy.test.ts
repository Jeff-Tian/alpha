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

  it('should convert', async () => {
    const res = await app
      .httpRequest()
      .get(
        `/proxy/convert?url=${encodeURIComponent(
          'https://cdn-global1.unicareer.com/uni-classroom-pc-bff/dev/%E9%A9%AC%E7%8E%89%E7%9A%84%E5%89%AF%E6%9C%AC1574230081124.xlsx'
        )}`
      )
      .expect(200)

    assert(res.headers['content-type'] === 'application/octet-stream')
  })
})
