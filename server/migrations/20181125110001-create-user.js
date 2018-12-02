'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'credentials',
                    key: 'id'
                }
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            surname: {
                allowNull: false,
                type: Sequelize.STRING
            },
            pesel: {
                allowNull: false,
                type: Sequelize.STRING
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING
            },
            group: {
                type: Sequelize.STRING
            },
            departament: {
                type: Sequelize.STRING
            },
            role: {
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
        }).then(() => queryInterface.addConstraint('users', ['role'], {
            type: 'check',
            where: {
                role: ['S', 'T', 'A']
            }
        }));
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};