import { Application } from 'egg'

export default (app: Application) => {
    const { controller, router } = app

    app.passport.mount('weapp', app.config.passportWeapp.clients.weapp)
    router.get(
        'wechatDev.passportCallback',
        '/passport/weapp/callback',
        controller.wechatDev.passportCallback
    )

    app.passport.mount(
        'weapp-yiqifen',
        app.config.passportWeapp.clients['weapp-yiqifen']
    )

    router.get(
        'wechatDev.passportCallback',
        '/passport/weapp-yiqifen/callback',
        controller.wechatDev.passportCallback
    )
}
