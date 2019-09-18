import {Service} from 'egg'

export default class User extends Service {
  public async find(username, password) {
    const {ctx} = this

    ctx.logger.info('finding user: ', {username, password})
    return ctx.model.User.findOne({})
  }

  public async register(user) {
    const {ctx} = this

    const transaction = await ctx.model.transaction({})
    try {
      const systemUser = await ctx.model.User.create(
        {
          display_name: user.displayName,
        },
        {transaction}
      )

      await ctx.model.Authorization.create(
        {
          provider: user.provider,
          uid: user.id,
          user_id: systemUser.id,
          created_at: new Date(),
          updated_at: new Date(),
          profile: JSON.stringify(user.profile),
        },
        {transaction}
      )

      await transaction.commit()

      return user
    } catch (err) {
      await transaction.rollback()

      ctx.logger.error('========== Error ===== Transaction =======>', err)

      throw err
    }
  }
}
