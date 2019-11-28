import {Application} from 'egg'
import {Column, DataType, Model, Sequelize, Table} from 'sequelize-typescript'

@Table({tableName: 'oauth-apps'})
class OauthApp extends Model<OauthApp> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number

  @Column(DataType.TEXT)
  redirectUris: string

  @Column(DataType.TEXT)
  grants: string

  @Column(DataType.STRING)
  name: string

  @Column(DataType.TEXT)
  description

  @Column(DataType.DATE)
  created_at

  @Column(DataType.DATE)
  updated_at

  @Column(DataType.BOOLEAN)
  approved

  @Column(DataType.STRING)
  client_id: string

  @Column(DataType.STRING)
  client_secret: string
}

export default (_: Application, sequelize: Sequelize) => {
  sequelize.addModels([OauthApp])
  return OauthApp
}
