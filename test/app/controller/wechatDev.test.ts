import assert = require('assert')
// tslint:disable-next-line:no-submodule-imports
import {app} from 'egg-mock/bootstrap'

describe('test/app/controller/wechatDev.test.ts', () => {
  it('should error', async () => {
    const result = await app
      .httpRequest()
      .get('/wechat-dev/access_token')
      .expect(422)

    assert.deepStrictEqual(result.body, {
      success: false,
      message: [
        {
          field: 'select',
          prompt: {isEnum: 'select must be a valid enum value'},
        },
      ],
    })
  })

  // it.skip('should GET /wechat-dev/access_token', async () => {
  //   await app
  //     .httpRequest()
  //     .get('/wechat-dev/access_token?select=passportWechat')
  //     .expect(200)
  // })

  it('saves referer', async () => {
    await app
      .httpRequest()
      .get('/passport/wechat-hardway')
      .expect(200)
  })
})
