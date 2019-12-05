import assert = require('assert')
// tslint:disable-next-line:no-submodule-imports
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/home.test.ts', () => {
  it('should GET /', async () => {
    const result = await app
      .httpRequest()
      .get('/')
      .expect(200);
    assert(result.text.match(/uniheart | I am Alpha, I am Omega/));
  });

  it('should be health', async () => {
    const result = await app
      .httpRequest()
      .get('/health-check')
      .expect(200);

    const parsed = JSON.parse(result.text);
    assert(parsed.NODE_ENV === 'test');
    assert(parsed.configEnv === 'unittest');
  });
});
