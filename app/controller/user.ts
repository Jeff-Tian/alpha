import {Controller} from 'egg'

export default class UserController extends Controller {
  public async logout() {
    const {ctx} = this

    ctx.logout()
    ctx.redirect(ctx.get('referer') || '/')
  }
}
