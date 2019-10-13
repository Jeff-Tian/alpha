import { Application } from 'egg'
import rememberReferer from '../../middleware/rememberReferer'
import validate from '../../middleware/validate'

export default (app: Application) => {
    const { controller, router } = app

    router.get(
        'wechatDev.passportCallback',
        '/passport/wechat-hardway/callback',
        controller.wechatDev.passportCallback
    )
    router.get(
        'wechatDev.passportStart',
        '/passport/wechat-hardway',
        rememberReferer
    )
    app.passport.mount('wechat', app.config.passportWechat.clients.wechat)
    app.passport.mount(
        'wechat-hardway',
        app.config.passportWechat.clients['wechat-hardway']
    )

    router.get(
        'wechatDev.getAccessToken',
        '/wechat-dev/access_token',
        validate,
        controller.wechatDev.getAccessToken
    )
    router.get(
        'wechatDev.getQRCode',
        '/wechat-dev/qr-code',
        validate,
        controller.wechatDev.getQRCode
    )
    router.get(
        'wechatDev.jsSDKSign',
        '/wechat-dev/js-sdk-sign',
        validate,
        controller.wechatDev.jsSDKSign
    )
    router.get(
        'wechatDev.code2Session',
        '/wechat-dev/code_2_session',
        validate,
        controller.wechatDev.code2Session
    )

    router.post(
        'wechatDev.message',
        '/endpoints/wechat/message',
        controller.wechatDev.message
    )
}
