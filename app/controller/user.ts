import {Controller} from 'egg'

export default class UserController extends Controller {
  public async logout() {
    const {ctx} = this

    ctx.logout()
    ctx.redirect(ctx.get('referer') || '/')
  }

  public async code() {
    const {ctx} = this

    ctx.body = ctx.query
  }

  public async authenticate() {
    const {ctx} = this
    ctx.body = ctx.query
  }
}
