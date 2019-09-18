import {Service} from 'egg'
import {Transaction} from 'sequelize'

export default class User extends Service {
  public async find(username, password) {
    const {ctx} = this

    ctx.logger.info('finding user: ', {username, password})
    return ctx.model.User.findOne({})
  }

  public async register(user) {
    const {ctx} = this

    const transaction = await ctx.model.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      autocommit: true,
    })
    try {
      const systemUser = await ctx.model.User.create(
        {
          display_name: user.displayName,
          transaction,
        },
        {transaction},
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
          transaction,
        },
        {transaction},
        {transaction}
      )

      await transaction.commit()
      // tslint:disable-next-line:no-console
      console.log('x    xxx x x x x xx x x xx transaction committed')

      return user
    } catch (err) {
      await transaction.rollback()

      ctx.logger.error('========== Error ===== Transaction =======>', err)

      throw err
    }
  }
}
