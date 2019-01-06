const Sequelize = require('sequelize');
const Op = Sequelize.Op;
'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('grades', 'term', {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        })
            .then(() => queryInterface.addConstraint('grades', ['term'], {
                type: 'check',
                where: {
                    term: {
                        [Op.gt]: 0
                    }
                }
            }));
    },
    down: (queryInterface, /*Sequelize*/) => {
        return queryInterface.dropTable('grades');
    }
};