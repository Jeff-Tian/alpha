import { Application, Context } from 'egg';

export default (app: Application) => {
  class Model {
    private ctx: Context

    constructor(ctx: Context) {
      ctx.logger.info('constructing Model...');
      app.logger.info('constructing oauth model...');
      this.ctx = ctx;
    }

    async getClient(clientId, clientSecret) {
      this.ctx.logger.info('getting client...', {
        clientId,
        clientSecret,
        args: arguments,
      });

      if (clientId === 'alpha') {
        return {
          client_id: clientId,
          clientSecret: 'alpha',
          grants: [ this.ctx.query.grant_type ],
          redirectUris: [ 'http://localhost:7001' ],
        };
      }
      throw new Error('clientId or clientSecret not correct');


      // tslint:disable-next-line:no-commented-code
      // return this.ctx.model.OauthApp.findOne({
      //   where: {
      //     client_id: clientId,
      //     client_secret: clientSecret,
      //   },
      // })
    }

    async grantTypeAllowed(clientId, grantType) {
      this.ctx.logger.info('clientId = ', clientId, 'grantType = ', grantType);
      return false;
    }

    async getUser(username, password) {
      this.ctx.logger.info('getUser invoked.......', { username, password });
      return this.ctx.service.user.find(username, password);
    }

    async getAccessToken(bearerToken) {
      this.ctx.logger.info('getting access token...', bearerToken);
      return bearerToken;
    }

    async saveToken(token, client, user) {
      this.ctx.logger.info('saving token...', { token, client, user });
      return token + client + user;
    }
    async revokeToken(token) {
      this.ctx.logger.info('revoking token...', token);
      return token;
    }
    async getAuthorizationCode(authorizationCode) {
      this.ctx.logger.info('auth code = ', authorizationCode);
      return authorizationCode;
    }
    async saveAuthorizationCode(code, client, user) {
      this.ctx.logger.info('saving auth code...', { code, client, user });
      return code + client + user;
    }
    async revokeAuthorizationCode(code) {
      this.ctx.logger.info('revoke code = ', code);
      return code;
    }
  }

  return Model;
};
