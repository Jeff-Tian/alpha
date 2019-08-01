'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    await queryInterface.addColumn('authorizations', 'password', {
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('authorizations', 'username', {
      type: Sequelize.STRING,
      unique: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    await queryInterface.removeColumn('authorizations', 'username')
    await queryInterface.removeColumn('authorizations', 'password')
  },
}
