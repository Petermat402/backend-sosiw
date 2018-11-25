'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Ocena', {
            id_przedmiot: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references:{
                    model : 'Przedmiot',
                    key: 'id_przedmiot'
                }
            },
            id_student: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model : 'Student',
                    key: 'id_student'
                }
            },
            wartosc: {
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
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Ocenas');
    }
};