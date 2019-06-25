import {Service} from 'egg'

export default class User extends Service {
  public async find() {
    return {}
  }

  public async register(user) {
    const {ctx} = this

    const transaction = await ctx.model.transaction()
    try {
      const systemUser = await ctx.model.User.create({
        display_name: user.displayName,
      })

      await ctx.model.Authorization.create({
        provider: user.provider,
        uid: user.id,
        user_id: systemUser.id,
        created_at: new Date(),
        updated_at: new Date(),
        profile: user.profile.toString(),
      })

      await transaction.commit()

      return user
    } catch (err) {
      await transaction.rollback()

      ctx.logger.error('========== Error ===== Transaction =======>', err)

      throw err
    }
  }
}
