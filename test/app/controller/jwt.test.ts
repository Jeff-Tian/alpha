import assert = require('assert')
// tslint:disable-next-line:no-submodule-imports
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/jwt.test.ts', () => {
  it('should throw 401 if no authorization header', async () => {
    await app
      .httpRequest()
      .get('/jwt/')
      .expect(401);
  });

  it('should success resolve token', async () => {
    const token = app.jwt.sign({ foo: 'bar' }, app.config.jwt.secret);
    const payload: any = app.jwt.verify(token, app.config.jwt.secret);

    assert.equal(payload.foo, 'bar');
  });

  it('should success sign use options.expiresIn', async () => {
    const token = app.jwt.sign({ foo: 'bar' }, app.config.jwt.secret, { expiresIn: 10 });
    const payload: any = app.jwt.verify(token, app.config.jwt.secret);

    assert.equal(payload.foo, 'bar');
  });

  // tslint:disable-next-line: no-identical-functions
  it('should success if route no use jwt', async () => {
    await app
      .httpRequest()
      .get('/jwt/login')
      .expect(200);
  });

  it('should work if authorization header is valid jwt', async () => {
    const token = app.jwt.sign({ foo: 'bar' }, app.config.jwt.secret);

    const res = await app
      .httpRequest()
    // tslint:disable-next-line: no-duplicate-string
      .get('/jwt/success')
      .set('Authorization', 'Bearer ' + token);

    assert(res.body.foo === 'bar');
  });

  // tslint:disable-next-line: no-identical-functions
  it('jwt.sign should support custom secret', async () => {
    const token = app.jwt.sign({ foo: 'bar' }, app.config.jwt.secret);

    const res = await app
      .httpRequest()
      .get('/jwt/success')
      .set('Authorization', 'Bearer ' + token);

    assert(res.body.foo === 'bar');
  });

  it('jwt.sign should support callback', done => {
    app.jwt.sign({ foo: 'bar' }, app.config.jwt.secret, (_err: Error, token) => {
      app
        .httpRequest()
        .get('/jwt/success')
        .set('Authorization', 'Bearer ' + token)
        .then(res => {
          assert(res.body.foo === 'bar');
          done();
        });
    });
  });

  it('should success if err instanceof UnauthorizedError ', async () => {
    await app
      .httpRequest()
      .get('/jwt/unauthorerror')
      .expect(/UnauthorizedError/);
  });
});
