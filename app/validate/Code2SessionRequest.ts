import {IsEnum, IsOptional} from 'class-validator'

enum KeySecretSelection {
  PASSPORT_WECHAT_MINI_PROGRAM_HARDWAY = 'passportWechatMiniProgramHardway',
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
