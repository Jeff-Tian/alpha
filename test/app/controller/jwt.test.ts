// tslint:disable-next-line:no-submodule-imports
import { app } from 'egg-mock/bootstrap'

describe('test/app/controller/jwt.test.ts', () => {
    it('should throw 401 if no authorization header', async () => {
        await app
            .httpRequest()
            .get('/jwt/')
            .expect(401);
    });
})
