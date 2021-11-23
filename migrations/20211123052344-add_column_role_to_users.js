'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'role',
      {
        type: Sequelize.STRING,
        defaultValue: 'CITIZEN',
        after: 'password'
      })
    await queryInterface.addConstraint('users', {
      type: 'unique',
      fields: ['email'],
      name: 'email_unique'

    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'role')
    // await queryInterface.removeConstraint('custom_unique_constraint_name')
  }
}
