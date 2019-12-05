import CitiOAuth from 'citi-oauth';
import crypto from 'crypto';
import { Controller } from 'egg';

export default class RewardsController extends Controller {
  public async getPointBalance() {
    const { ctx } = this;
    const { app } = ctx;

    const citiOAuth = new CitiOAuth(
      app.config.passportCiti.key,
      app.config.passportCiti.secret,
      app.config.passportCiti.successReturnToOrRedirect,
    );

    ctx.body = await citiOAuth
      .Reward
      .getPointBalance(
        ctx.query.countryCode,
        crypto
          .createHash('sha512')
          .update(ctx.query.creditCardNumber, 'utf8').digest('hex'),
      );
  }
}
