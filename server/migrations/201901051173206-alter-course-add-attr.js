const Sequelize = require('sequelize');
const Op = Sequelize.Op;
'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('courses', 'academicYear', {
            type: Sequelize.STRING,
            allowNull: false
        })
            .then(() => queryInterface.addColumn('courses', 'semester', {
                type: Sequelize.STRING,
                allowNull: false
            }))
            .then(() => queryInterface.addConstraint('courses', ['semester'], {
                type: 'check',
                where: {
                    semester: ['summer', 'winter']
                }
            }));
    },
    down: (queryInterface, /*Sequelize*/) => {
        return queryInterface.dropTable('grades');
    }
};