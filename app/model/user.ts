import {Application} from 'egg'
import {Column, Model, Sequelize, Table} from 'sequelize-typescript'

@Table({
  tableName: 'users',
})
class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number

  @Column({comment: '显示的名称'})
  display_name: string

  @Column
  created_at: Date

  @Column
  updated_at: Date
}

export default (_: Application, sequelize: Sequelize) => {
  sequelize.addModels([User])
  return User
}
