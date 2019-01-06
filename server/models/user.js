'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        surname: {
            allowNull: false,
            type: DataTypes.STRING
        },
        pesel: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        group: {
            type: DataTypes.STRING
        },
        departament: {
            allowNull: false,
            type: DataTypes.STRING
        },
        role: {
            allowNull: false,
            type: DataTypes.STRING
        }
    });
    user.associate = function (models) {
        user.belongsTo(models.credential, {
            foreignKey: 'id'
        });
        user.hasMany(models.grade, {
            foreignKey: 'id_student'
        });
        user.hasMany(models.course, {
            foreignKey: 'id_teacher'
        })
    };
    return user;
};