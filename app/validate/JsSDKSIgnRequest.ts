import { IsOptional } from 'class-validator'
import GetAccessTokenRequest from './GetAccessTokenRequest'

export default class JsSDKSignRequest extends GetAccessTokenRequest {
    @IsOptional()
    ticket: string

    @IsOptional()
    url: string
}
