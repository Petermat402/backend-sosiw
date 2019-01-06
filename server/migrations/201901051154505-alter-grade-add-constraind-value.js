const Sequelize = require('sequelize');
const Op = Sequelize.Op;
'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint('grades', ['value'], {
            type: 'check',
            where: {
                value: [2, 3, 3.5, 4, 4.5, 5]
            }
        });
    },
    down: (queryInterface, /*Sequelize*/) => {
        return queryInterface.dropTable('grades');
    }
};