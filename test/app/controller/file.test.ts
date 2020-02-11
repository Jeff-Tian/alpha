import assert = require('assert')
// tslint:disable-next-line:no-submodule-imports
import { app } from 'egg-mock/bootstrap';
import path from 'path';
import nock from 'nock';

describe('test/app/controller/file.test.ts', () => {
  it('should upload', async () => {
    app.mockCsrf()

    nock(/http\:\/\/libre-office\.oss-cn-shanghai.+/)
      .put(() => true)
      .reply(200, { url: 'http://libre-office.oss-cn-shanghai.aliyuncs.com/libre-office/example.docx' });

    nock(/http\:\/\/libre-office\.oss-cn-shanghai.+/)
      .put(() => true)
      .reply(200, 'http://libre-office.oss-cn-shanghai.aliyuncs.com/libre-office/example.docx');


    const res = await app
      .httpRequest()
      .put(`/file/upload?expireIn=${15000}&folder=doc-giggle`)
      .attach('file', path.join(__dirname, '../../files/example.docx'))
      .expect(200);

    assert.deepStrictEqual(res.body.url, 'http://libre-office.oss-cn-shanghai.aliyuncs.com/doc-giggle/example.docx');
  });
});
