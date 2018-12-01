'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('administrators', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
          references: {
              model: 'credentials',
              key: 'id'
          }
      },
      name: {
        type: Sequelize.STRING,
          allowNull: false
      },
      surname: {
        type: Sequelize.STRING,
          allowNull: false
      },
      pesel: {
        type: Sequelize.STRING,
          allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('administrators');
  }
};