'use strict';
module.exports = (sequelize, DataTypes) => {
    const credential = sequelize.define('credential', {
        /*id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },*/
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    credential.associate = function (models) {
        credential.hasOne(models.student, {
            foreignKey: 'id_student'
        });
        credential.hasOne(models.teacher, {
            foreignKey: 'id_teacher'
        })
    };
    return credential;
};