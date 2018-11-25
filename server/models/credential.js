'use strict';
module.exports = (sequelize, DataTypes) => {
    const Credential = sequelize.define('Credential', {
        login: {
            allowNull: false,
            type: DataTypes.STRING
        },
        haslo: {
            allowNull: false,
            type: DataTypes.STRING
        },
        id_osoby: {
            allowNull: false,
            type: DataTypes.INTEGER
        }
    });
    Credential.associate = function (models) {
        Credential.hasOne(models.student, {
            foreignKey: 'id_student'
        });
        Credential.hasOne(models.nauczyciel, {
            foreignKey: 'id_nauczyciel'
        })
    };
    return Credential;
};