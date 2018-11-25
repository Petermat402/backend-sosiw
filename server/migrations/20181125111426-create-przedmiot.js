'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Przedmiot', {
            id_przedmiot: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nazwa: {
                allowNull: false,
                type: Sequelize.STRING
            },
            id_nauczyciel: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Nauczyciel',
                    key: 'id_nauczyciel'
                }
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
        return queryInterface.dropTable('Przedmiots');
    }
};