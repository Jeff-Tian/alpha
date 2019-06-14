import {Application} from 'egg'

export default (app: Application) => {
  const {STRING, INTEGER, DATE} = app.Sequelize

  return app.model.define('user', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    display_name: STRING,
    created_at: DATE,
    updated_at: DATE,
  })
}
