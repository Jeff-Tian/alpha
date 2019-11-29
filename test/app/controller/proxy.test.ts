import assert = require('assert')
// tslint:disable-next-line:no-submodule-imports
import { app } from 'egg-mock/bootstrap'

describe('test/app/controller/proxy.test.ts', () => {
  const getBaidu = async () => {
    const res = await app
      .httpRequest()
      .get(`/proxy?url=${encodeURIComponent('https://www.baidu.com')}`)
      // tslint:disable-next-line:no-duplicate-string
      .expect(200)

    assert(res.text.includes('</html>'))
  }

  const getLaji = async () => {
    const res = await app
      .httpRequest()
      .get(`/proxy?url=${'https%3A%2F%2Fyiqifen.pa-ca.me%2Fshare%2Fa%2Fshare%2Fapi%2FqueryGarbage%3Ftype%3D%E6%B9%BF%E5%9E%83%E5%9C%BE'}`)
      // tslint:disable-next-line:no-duplicate-string
      .expect(200)

    assert(res.body instanceof Array)
  }

  it('should proxy html', async () => {
    await app.redis.flushall();
    await getBaidu()
  })

  it('should get from cache', getBaidu)

  it('shoudl get laji', getLaji)
  it('shoudl get laji from cach', getLaji)
})
