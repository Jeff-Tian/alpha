import {IsEnum, IsOptional} from 'class-validator'
import {KeySecretSelection} from './GetAccessTokenRequest'

export default class GetQRCodeRequest {
  @IsOptional()
  token: string

  @IsOptional()
  data: any

  @IsEnum(KeySecretSelection)
  select: string

  @IsOptional()
  key: string

  @IsOptional()
  secret: string
}
