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
        ctx.body = 'jwt success'
    }

    public async unauthorerror() {
        const { ctx } = this;
        ctx.body = 'jwt unauthorerror'
    }
}
