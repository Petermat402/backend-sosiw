'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('users', 'language', {
            type: Sequelize.STRING,
            defaultValue: 'en',
            allowNull: false
        })
    },
    down: (queryInterface, /*Sequelize*/) => {
        return queryInterface.dropTable('grades');
    }
};