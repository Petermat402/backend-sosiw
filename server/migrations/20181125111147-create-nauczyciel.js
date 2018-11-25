'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Nauczyciel', {
            id_nauczyciel: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references:{
                    model: 'Credential',
                    key: 'id_osoby'
                }
            },
            imie: {
                allowNull: false,
                type: Sequelize.STRING
            },
            nazwisko: {
                allowNull: false,
                type: Sequelize.STRING
            },
            pesel: {
                allowNull: false,
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            wydzial: {
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
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Nauczyciels');
    }
};