import {Application} from 'egg'

export default (app: Application) => {
  const {STRING, INTEGER, DATE, TEXT, BOOLEAN} = app.Sequelize

  return app.model.define('oauthApp', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    redirectUris: TEXT,
    grants: TEXT,
    name: STRING,
    description: TEXT,
    created_at: DATE,
    updated_at: DATE,
    approved: BOOLEAN,
    client_id: STRING,
    client_secret: STRING,
  })
}
