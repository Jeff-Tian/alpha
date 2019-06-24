'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    const {
      INTEGER,
      DATE,
      STRING,
      TEXT
    } = Sequelize
    await queryInterface.createTable('authorizations', {
      provider: STRING,
      uid: STRING,
      user_id: INTEGER,
      created_at: DATE,
      updated_at: DATE,
      profile: TEXT,
    })
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    await queryInterface.dropTable('authorizations')
  }
};