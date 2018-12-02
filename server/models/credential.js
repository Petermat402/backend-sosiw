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
        }
    });
    credential.associate = function (models) {
        credential.hasOne(models.user, {
            foreignKey: 'id'
        })
    };
    return credential;
};