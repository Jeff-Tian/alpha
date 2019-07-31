import {Application} from 'egg'

export default (app: Application) => {
  const {STRING, INTEGER, DATE, TEXT} = app.Sequelize

  return app.model.define('authorization', {
    provider: {type: STRING, primaryKey: true},
    uid: {type: STRING, primaryKey: true},
    username: {type: STRING, unique: true},
    password: {type: STRING},
    user_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
    profile: TEXT,
  })
}
