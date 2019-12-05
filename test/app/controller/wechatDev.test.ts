import assert = require('assert')
// tslint:disable-next-line:no-submodule-imports
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/wechatDev.test.ts', () => {
  it('should error', async () => {
    const result = await app
      .httpRequest()
      .get('/wechat-dev/access_token')
      .expect(422);

    assert.deepStrictEqual(result.body, {
      success: false,
      message: [
        {
          field: 'select',
          prompt: { isEnum: 'select must be a valid enum value' },
        },
      ],
    });
  });

  it('should GET /wechat-dev/access_token', async () => {
    await app
      .httpRequest()
      .get('/wechat-dev/access_token?select=wechat')
      .expect(500)
      .expect(/invalid appid hint/);
  });

  it.skip('should proxy wechat qrcode', async () => {
    const ctx = app.mockContext();

    // tslint:disable-next-line:max-line-length
    const res = await ctx.curl('https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQHW7zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyM1lhbHBqdEpmbmsxeXhOSXh0MXMAAgQh96JdAwSAOgkA');
    assert(res.status === 200);
  });
});
