import {Application} from 'egg'
import {Column, DataType, Model, Sequelize, Table} from 'sequelize-typescript'

@Table({tableName: 'authorizations'})
class Authorization extends Model<Authorization> {
  @Column({
    primaryKey: true,
    type: DataType.STRING,
  })
  provider: string

  @Column({primaryKey: true, type: DataType.STRING})
  uid: string

  @Column({type: DataType.STRING, unique: true})
  username

  @Column({type: DataType.STRING})
  password

  @Column({type: DataType.INTEGER})
  user_id

  @Column({type: DataType.DATE})
  created_at: Date

  @Column({type: DataType.DATE})
  updated_at: Date

  @Column({type: DataType.TEXT})
  profile: string
}

export default (_: Application, sequelize: Sequelize) => {
  sequelize.addModels([Authorization])
  return Authorization
}
