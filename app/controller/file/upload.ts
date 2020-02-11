import { Controller } from 'egg';
import path from 'path';
import sendToWormhole from 'stream-wormhole';
import mime from 'mime-types';

export default class UploadController extends Controller {
  public async upload() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const name = ctx.query.folder + '/' + path.basename(stream.filename);


    try {
      const tempUrl = ctx.oss.signatureUrl(name, { expires: 600, method: 'GET', 'Content-Type': mime.lookup(name) });
      const result = { ...await ctx.oss.put(name, stream), signatureUrl: tempUrl };

      await ctx.oss.putACL(name, 'private');

      ctx.body = {
        url: result.url,
        fields: stream.fields,
        queries: ctx.queries,
      };
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }

  }
}
