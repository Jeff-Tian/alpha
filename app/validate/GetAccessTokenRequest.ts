import { IsEnum, IsOptional } from 'class-validator';

export enum KeySecretSelection {
  PASSPORT_HARDWAY = 'wechat-hardway',
  PASSPORT_WECHAT = 'wechat',
  PASSPORT_WECHAT_MINI_PROGRAM_HARDWAY = 'passportWeapp',
  CUSTOMIZED = 'customized',
}

export default class GetAccessTokenRequest {
  @IsOptional()
  key: string

  @IsOptional()
  secret: string

  @IsEnum(KeySecretSelection)
  select: string
}
