import {IsEnum, IsOptional} from 'class-validator'
import {KeySecretSelection} from './GetAccessTokenRequest'

export default class GetAccessTokenRequest {
  @IsOptional()
  key: string

  @IsOptional()
  secret: string

  @IsEnum(KeySecretSelection)
  select: string
}
