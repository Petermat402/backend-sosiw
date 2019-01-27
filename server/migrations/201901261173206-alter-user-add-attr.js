'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('users', 'reminder', {
            type: Sequelize.BOOLEAN,
        })
    },
    down: (queryInterface, /*Sequelize*/) => {
        return queryInterface.dropTable('grades');
    }
};