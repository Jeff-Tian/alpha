import { Controller } from 'egg';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const FileNameExpert = require('file-name-expert').default;
export default class ProxyController extends Controller {
  public async get() {
    const { ctx } = this;

    const { data } = (await ctx.curl(ctx.query.url, { streaming: false, retry: 3, timeout: [ 3000, 30000 ] }));

    ctx.app.redis.set(ctx.query.url, data.toString('hex'));
    ctx.app.redis.expire(ctx.query.url, process.env.PROXY_TIMEOUT ? Number(process.env.PROXY_TIMEOUT) : 60 * 60 * 12);

    const final = data.toString();

    try {
      ctx.type = 'json';
      ctx.body = JSON.parse(final);
    } catch (ex) {
      ctx.type = 'html';
      ctx.body = final;
    }
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
