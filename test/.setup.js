const {app} = require('egg-mock/bootstrap')
const factories = require('./factories.js')

before(() => factories(app))
afterEach(async () => {
  // clear database after each test case
  await Promise.all([
    app.model.User.destroy({truncate: true, force: true}),
    app.model.Authorization.destroy({truncate: true, force: true}),
  ])
})
