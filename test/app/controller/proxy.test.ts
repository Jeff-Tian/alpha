import assert = require('assert')
// tslint:disable-next-line:no-submodule-imports
import { app } from 'egg-mock/bootstrap';

describe.skip('test/app/controller/proxy.test.ts', () => {
  const getBaidu = async () => {
    const res = await app
      .httpRequest()
      .get(`/proxy?url=${encodeURIComponent('https://www.baidu.com')}`)
      .expect(200);

    assert(res.text.includes('</html>'));
  };

  it('should proxy html', async () => {
    await app.redis.flushall();
    await getBaidu();
  });

  it('should get from cache', getBaidu);

  it.skip('pipes file', async () => {
    const res = await app.httpRequest().get(`/proxy/pipe-file?url=${encodeURIComponent('http://libre-office.oss-cn-shanghai.aliyuncs.com/%25E4%25BD%259C%25E4%25B8%259A1581528201606.pdf')}`).expect(200);

    assert(res.status === 200);
    assert(res.body.length > 0);
  });
});
