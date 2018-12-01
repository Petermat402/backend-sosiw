'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('grades', {
            id_course: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references:{
                    model : 'courses',
                    key: 'id',
                    as: 'id_course'
                }
            },
            id_student: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model : 'students',
                    key: 'id',
                    as: 'id_course'
                }
            },
            value: {
                allowNull: true,
                type: Sequelize.DECIMAL
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
    down: (queryInterface, /*Sequelize*/) => {
        return queryInterface.dropTable('grades');
    }
};