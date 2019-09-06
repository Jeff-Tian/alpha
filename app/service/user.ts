import {Service} from 'egg'

export default class User extends Service {
  public async find(username, password) {
    const {ctx} = this

    ctx.logger.info('finding user: ', {username, password})
    return ctx.model.User.findOne({})
  }

  public async register(user) {
    const {ctx} = this

    const transaction = await ctx.model.transaction()
    try {
      const systemUser = await ctx.model.User.create({
        display_name: user.displayName,
      })
      // tslint:disable-next-line:no-console
      console.log('created systemUser = ', systemUser)

      await ctx.model.Authorization.create({
        provider: user.provider,
        uid: user.id,
        user_id: systemUser.id,
        created_at: new Date(),
        updated_at: new Date(),
        profile: JSON.stringify(user.profile),
      })

      await transaction.commit()

      // tslint:disable-next-line:no-console
      console.log('transaction committed, user = ', user)
      return user
    } catch (err) {
      await transaction.rollback()

      ctx.logger.error('========== Error ===== Transaction =======>', err)

      throw err
    }
  }
}
