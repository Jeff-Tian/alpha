import {Application} from 'egg'

export default (app: Application) => {
  const {STRING, INTEGER, DATE, TEXT} = app.Sequelize

  return app.model.define('authorization', {
    provider: STRING,
    uid: STRING,
    user_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
    profile: TEXT,
  })
}
