import assert from 'assert';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Context } from 'egg';
import Code2SessionRequest from '../validate/Code2SessionRequest';
import GetAccessTokenRequest from '../validate/GetAccessTokenRequest';
import GetQRCodeRequest from '../validate/GetQRCodeRequest';
import JsSDKSignRequest from '../validate/JsSDKSIgnRequest';

const typeMap = new Map([
  [ 'wechatDev.getAccessToken', GetAccessTokenRequest ],
  [ 'wechatDev.getQRCode', GetQRCodeRequest ],
  [ 'wechatDev.code2Session', Code2SessionRequest ],
  [ 'wechatDev.jsSDKSign', JsSDKSignRequest ],
]);

export default async (ctx: Context, next: () => {}) => {
  const type = typeMap.get(ctx.routerName);

  assert.ok(type);

  const target = plainToClass(type!, ctx.query);
  const errors = await validate(target);

  if (!errors.length) {
    return next();
  }

  ctx.status = 422;
  ctx.body = {
    success: false,
    message: errors.map(error => ({
      field: error.property,
      prompt: error.constraints,
    })),
  };
};
