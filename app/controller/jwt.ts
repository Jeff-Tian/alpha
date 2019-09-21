import { Controller } from 'egg'

export default class JwtController extends Controller {
    public async index() {
        const { ctx } = this
        ctx.body = 'jwt index'
    }

    public async login() {
        const { ctx } = this;
        ctx.body = 'jwt login'
    }

    public async success() {
        const { ctx } = this;
        ctx.body = ctx.state.user;
    }

    public async unauthorerror() {
        const { ctx } = this;
        ctx.body = 'jwt unauthorerror'
    }

    public async user() {
        const { ctx } = this;
        ctx.body = await ctx.service.user.get(ctx.state.user)
    }
}
