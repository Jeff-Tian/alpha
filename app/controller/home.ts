import {Controller} from 'egg'

export default class HomeController extends Controller {
  public async index() {
    const {ctx} = this
    ctx.body = await ctx.service.test.sayHi('egg')
  }

  public async render() {
    const ctx = this.ctx

    if (ctx.isAuthenticated()) {
      ctx.body = `<div>
        <h2>${ctx.path}</h2>
        <hr>
        Logged in user: <img src="${ctx.user.photo}"> ${
        ctx.user.displayName
        } / ${ctx.user.id} | <a href="/logout">Logout</a>
        <pre><code>${JSON.stringify(ctx.user, null, 2)}</code></pre>
        <hr>
        <a href="/">Home</a> | <a href="/user">User</a>
      </div>`
    } else {
      ctx.session.returnTo = ctx.path
      ctx.body = `
        <div>
          <h2>${ctx.path}</h2>
          <hr>
          Login with
          <a href="/passport/github">Github</a>
          <hr>
          <a href="/">Home</a> | <a href="/user">User</a>
        </div>
      `
    }
  }
}
