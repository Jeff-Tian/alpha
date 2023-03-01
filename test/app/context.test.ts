// tslint:disable-next-line: no-submodule-imports
import { app, assert } from 'egg-mock/bootstrap';

describe('test/app.test.ts', () => {
  describe('basic', () => {
    it.skip('post xml', async () => {
      const ctx = app.mockContext();
      const res = await ctx.curl(
        'localhost:7001/v2/user/oauth/wechat/receive',
        {
          type: 'POST',
          contentType: 'application/xml',
          dataType: 'application/json',
          content: '<xml></xml>',
        },
      );

      assert(res.status === 200);
      assert(res.data.message === '<xml></xml>');
    });

    it('knows env', async () => {
      const ctx = app.mockContext();
      assert(ctx.app.env === 'unittest');
    });
  });
});
