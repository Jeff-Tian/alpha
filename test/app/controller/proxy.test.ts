import assert = require('assert')
// tslint:disable-next-line:no-submodule-imports
import {app} from 'egg-mock/bootstrap'

describe('test/app/controller/proxy.test.ts', () => {
  const getBaidu = async () => {
    const res = await app
      .httpRequest()
      .get(`/proxy?url=${encodeURIComponent('https://www.baidu.com')}`)
      .expect(200)

    assert(res.headers.get('access-control-allow-origin') === '*')
    assert(res.text.includes('</html>'))
  }

  const getImage = async () => {
    const res = await app.httpRequest()
      .get(`/proxy?url=${encodeURIComponent('https://cdn.nlark.com/yuque/0/2021/png/221736/1633257522698-d87487fc-eb23-4fa5-8db7-6a4bbf88f02a.png')}`)
      .expect(200)

    assert(res.text.includes('PNG'))
  }

  const graphql = async () => {
    const res = await app.httpRequest()
      .post(`/proxy?url=${encodeURIComponent('https://jqp5j170i6.execute-api.us-east-1.amazonaws.com/dev/gatsby/graphql')}`)
      .type('application/json')
      .send({
        query: '{ \n  yuque(id: "53296538") {\n    id\n    title\n    description\n    \n  }\n  \n  allYuque {\n    nodes {\n      id\n      title\n    }\n  }\n}',
        variables: null,
      })
      .expect(200)

    assert.strictEqual(res.body.errors, undefined)
    assert(res.body.data.yuque.title === '快速下载 GitHub 上项目下的子目录')
  }

  it('should proxy html', async () => {
    await app.redis.flushall()
    await getBaidu()
  })

  it('should proxy image', async () => {
    await getImage()
  })

  it('should get from cache', getBaidu)

  it('should proxy graphql', graphql)

  it.skip('pipes file', async () => {
    const res = await app.httpRequest()
      .get(`/proxy/pipe-file?url=${encodeURIComponent('http://libre-office.oss-cn-shanghai.aliyuncs.com/%25E4%25BD%259C%25E4%25B8%259A1581528201606.pdf')}`)
      .expect(200)

    assert(res.status === 200)
    assert(res.body.length > 0)
  })
})
