import { Application } from 'egg'

export default (app: Application) => {
    const localStrategy = app.passport.authenticate('local')
    app.router.post('/passport/local', localStrategy)

}
