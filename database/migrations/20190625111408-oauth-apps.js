'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    const {INTEGER, DATE, STRING, TEXT, BOOLEAN} = Sequelize
    await queryInterface.createTable('oauth-apps', {
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
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    await queryInterface.dropTable('oauth-apps')
  },
}
