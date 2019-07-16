import {Controller} from 'egg'

export default class HomeController extends Controller {
  public async index() {
    const {ctx} = this
    ctx.body = await ctx.service.test.healthCheck()
  }

  public async render() {
    const ctx = this.ctx

    if (ctx.isAuthenticated()) {
      await ctx.render('logged-in.pug', {ctx})
    } else {
      ctx.session.returnTo = ctx.path
      await ctx.render('index.pug', {ctx})
    }
  }
}
