import assert = require('assert')
import {Context} from 'egg'
// tslint:disable-next-line:no-submodule-imports
import {app} from 'egg-mock/bootstrap'

describe('test/app/service/user.test.js', () => {
  let ctx: Context

  before(async () => {
    ctx = app.mockContext()
  })

  it('registers user', async () => {
    const user = await ctx.model.User.create({
      display_name: 'hello',
    })

    assert(ctx.model.User.tableName === 'users')
    // assert(user.profile.hello === 'world')
    assert(user.display_name === 'hello')
    const number = await ctx.model.User.count()
    assert(number >= 1)
  })
})
