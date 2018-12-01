'use strict';
module.exports = (sequelize, DataTypes) => {
    const credential = sequelize.define('credential', {

        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    credential.associate = function (models) {
        credential.hasOne(models.student, {
            foreignKey: 'id'
        });
        credential.hasOne(models.teacher, {
            foreignKey: 'id'
        })
    };
    return credential;
};