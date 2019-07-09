import {IsEnum, IsOptional} from 'class-validator'

export enum KeySecretSelection {
  PASSPORT_HARDWAY = 'passportHardway',
  PASSPORT_WECHAT = 'passportWechat',
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
