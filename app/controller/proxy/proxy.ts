import { Controller } from 'egg'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const FileNameExpert = require('file-name-expert').default

export const curlirize = config => {
  const headers = config.headers?.common ?? config.headers

  const serializedHeaders = headers ? Object.keys(headers)
    .map(key => `--header '${key}: ${headers[key]}'`) : []

  const cmd = `cURL to replay: curl -X ${config.method} "${config.url}${
    config.params ? `?${new URLSearchParams(config.params).toString()}` : ''
  }" ${serializedHeaders.join(' ')} `

  if (config.data) {
    return cmd + `--data-binary $'${config.data}'`
  }

  return cmd
}


export default class ProxyController extends Controller {
  /**
   * query.url: url to be proxied
   * query.format: output format
   */
  public async get() {
    const { ctx } = this

    const res = (await ctx.curl(ctx.query.url, { streaming: false, retry: 3, timeout: [ 3000, 30000 ] }))

    const { data, headers, status } = res

    if (data instanceof Buffer) {
      ctx.logger.info('format is ', { format: ctx.query.format })
      if (ctx.query.format === 'json') {
        ctx.body = {
          raw: data.toString(),
          headers,
        }
      } else {
        ctx.logger.info('headers are ', { headers })
        ctx.status = status
        ctx.set({ ...headers, 'Access-Control-Allow-Origin': '*' })
        ctx.body = data
      }

      ctx.logger.info('data is buffer for ', { url: ctx.query.url })
      return
    }

    ctx.logger.info('data is not buffer for ', { url: ctx.query.url })
    ctx.app.redis.set(ctx.query.url, data.toString('hex'))
    ctx.app.redis.expire(ctx.query.url, process.env.PROXY_TIMEOUT ? Number(process.env.PROXY_TIMEOUT) : 60 * 60 * 12)

    const final = data.toString()

    ctx.set({ ...headers, 'Access-Control-Allow-Origin': '*' })

    ctx.type = 'json'

    try {
      ctx.body = { ...JSON.parse(final), headers }
    } catch (ex) {
      if (ctx.query.format === 'json') {
        ctx.body = {
          raw: final,
        }
      } else {
        ctx.type = 'html'
        ctx.body = final
      }
    }
  }

  /**
   * query.url: url to be proxied
   * query.dataType: dataType passed to outgoing request
   */
  public async post() {
    const { ctx } = this

    const requestHeaders = {
      authority: ctx.query.authority ?? ctx.get('authority'),
      origin: ctx.query.origin ?? ctx.get('origin'),
      referer: ctx.query.referer ?? ctx.get('referer'),
      cookie: ctx.query.cookie ?? ctx.get('cookie'),
    }

    console.log('curling: ', curlirize({
      headers: requestHeaders,
      method: 'POST',
      url: ctx.query.url,
      params: {},
      data: JSON.stringify(ctx.request.body),
    }))

    const { data, headers } = (await ctx.curl(ctx.query.url, {
      streaming: false,
      retry: 3,
      timeout: [ 3000, 30000 ],
      method: 'POST',
      type: 'POST',
      contentType: ctx.get('Content-Type') ?? 'json',
      data: JSON.stringify(ctx.request.body),
      dataType: ctx.query.dataType ?? 'json',
      headers: requestHeaders,
    }))

    console.log('post result = ', data, headers)

    if (typeof data === 'string') {
      ctx.body = { data, headers }
      return
    }

    ctx.set({ ...headers, 'Access-Control-Allow-Origin': '*' })

    ctx.body = { ...data, headers }
  }

  public async pipeFile() {
    const { ctx } = this
    const { url } = ctx.query

    this.ctx.attachment(FileNameExpert.getFileNameFromUrl(url))
    this.ctx.set('Content-Type', 'application/octet-stream')
    ctx.body = (await ctx.curl(url, {
      streaming: true, retry: 3, timeout: [ 10000, 30000 ],
      followRedirect: true,
    })).res
  }
}
