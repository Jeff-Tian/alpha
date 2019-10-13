import { IsOptional } from 'class-validator'
import GetAccessTokenRequest from './GetAccessTokenRequest'

export default class GetQRCodeRequest extends GetAccessTokenRequest {
  @IsOptional()
  token: string

  @IsOptional()
  ticket: string

  @IsOptional()
  data: any

  @IsOptional()
  mode: 'redirect' | 'proxy' | 'raw'
}
