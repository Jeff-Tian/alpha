import { Controller } from 'egg';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const FileNameExpert = require('file-name-expert').default;

export const curlirize = config => {
  const headers = config.headers?.common ?? config.headers;

  const serializedHeaders = headers ? Object.keys(headers).map(key => `--header "${key}: ${headers[key]}"`) : [];

  const cmd = `cURL to replay: curl -X ${config.method} "${config.url}${
    config.params ? `?${new URLSearchParams(config.params).toString()}` : ''
  }" ${serializedHeaders.join(' ')} `;

  if (config.data) {
    return cmd + `--data '${config.data}'`;
  }

  return cmd;
};


export default class ProxyController extends Controller {
  public async get() {
    const { ctx } = this;

    const res = (await ctx.curl(ctx.query.url, { streaming: false, retry: 3, timeout: [ 3000, 30000 ] }));

    console.log('res = ', res);

    const { data, headers, status } = res;

    if (data instanceof Buffer) {
      ctx.status = status;
      ctx.set({ ...headers, 'Access-Control-Allow-Origin': '*' });
      ctx.body = data;

      return;
    }

    ctx.app.redis.set(ctx.query.url, data.toString('hex'));
    ctx.app.redis.expire(ctx.query.url, process.env.PROXY_TIMEOUT ? Number(process.env.PROXY_TIMEOUT) : 60 * 60 * 12);

    const final = data.toString();

    ctx.set({ ...headers, 'Access-Control-Allow-Origin': '*' });

    try {
      ctx.type = 'json';
      ctx.body = JSON.parse(final);
    } catch (ex) {
      ctx.type = 'html';
      ctx.body = final;
    }
  }

  public async post() {
    const { ctx } = this;

    const requestHeaders = {
      authority: ctx.query.authority ?? ctx.get('authority'),
      origin: ctx.query.origin ?? ctx.get('origin'),
      referer: ctx.referer ?? ctx.get('referer'),
      cookie: ctx.query.cookie ?? ctx.get('cookie'),
    }

    const { data, headers } = (await ctx.curl(ctx.query.url, {
      streaming: false,
      retry: 3,
      timeout: [ 3000, 30000 ],
      method: 'POST',
      type: 'POST',
      contentType: ctx.get('Content-Type') ?? 'json',
      data: ctx.request.body,
      dataType: ctx.query.dataType ?? 'json',
      headers: requestHeaders,
    }));

    ctx.set({ ...headers, 'Access-Control-Allow-Origin': '*' });

    console.log('curl to replay: ', curlirize({ headers: requestHeaders, method: 'POST', url: ctx.query.url, params: {}, data: JSON.stringify(ctx.request.body) }));

    ctx.body = { ...data, headers };
  }

  public async pipeFile() {
    const { ctx } = this;
    const { url } = ctx.query;

    this.ctx.attachment(FileNameExpert.getFileNameFromUrl(url));
    this.ctx.set('Content-Type', 'application/octet-stream');
    ctx.body = (await ctx.curl(url, {
      streaming: true, retry: 3, timeout: [ 10000, 30000 ],
      followRedirect: true,
    })).res;
  }
}
