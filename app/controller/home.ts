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

  public async proxy() {
    const {ctx, app} = this

    const {method, curl, path, querystring} = ctx

    const url = app.config.assets.url + path + '?' + querystring

    // @ts-ignore
    const res = await curl.bind(ctx)(url, {
      method,
    })

    ctx.body = res.data
    ctx.status = res.status
  }
}
