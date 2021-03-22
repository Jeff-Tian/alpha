import assert = require('assert')
import mm from 'egg-mock';
import path from 'path';
import runscript = require('runscript')

const baseDir = path.resolve(__dirname, '../..');

describe('test/models.test.ts', () => {
  before(async () => {
    await runscript('ets', { cwd: baseDir });
    await runscript(`tsc -p ${baseDir}/tsconfig.json`, { cwd: baseDir });
  });

  after(async () => {
    await runscript('ets clean', { cwd: baseDir });
  });

  describe('compiling code', () => {
    afterEach(mm.restore);

    let app;

    before(async () => {
      app = mm.app({
        baseDir: '../..',
      });

      return app.ready();
    });

    after(async () => {
      app.close();

      assert.deepStrictEqual(app._app._backgroundTasks, undefined);
    });

    it('should show models', () => {
      assert(app.model.config.database === 'alpha');
      assert(typeof app.model.Authorization === 'function');
    });
  });
});
