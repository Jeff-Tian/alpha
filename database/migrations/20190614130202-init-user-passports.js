'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    const {INTEGER, DATE, STRING, JSON} = Sequelize
    await queryInterface.createTable('user-passports', {
      provider: STRING,
      uid: STRING,
      user_id: INTEGER,
      created_at: DATE,
      updated_at: DATE,
      profile: JSON,
    })
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('user-passports')
  },
}
