'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('lectures', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_course: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references:{
                    model : 'courses',
                    key: 'id',
                    as: 'id_course'
                }
            },
            start_hour: {
                allowNull: false,
                type: Sequelize.DATE
            },
            group: {
                allowNull: false,
                type: Sequelize.STRING
            },
            room: {
                allowNull: false,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
            .then(() => {
            queryInterface.addConstraint('lectures', ['start_hour', 'room'], {
                type: 'unique',
                name: 'start_hour_and_room_unique_constraint'
            })
        })
            .then(() => {
                queryInterface.addConstraint('lectures', ['start_hour', 'group'], {
                    type: 'unique',
                    name: 'start_hour_and_group_unique_constraint'
                })
            })
    },
    down: (queryInterface, /*Sequelize*/) => {
        return queryInterface.dropTable('grades');
    }
};