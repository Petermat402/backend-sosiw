'use strict';
module.exports = (sequelize, DataTypes) => {
    const student = sequelize.define('student', {
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
            allowNull: false,
            type: DataTypes.STRING
        },
        departament: {
            allowNull: false,
            type: DataTypes.STRING
        }
    });
    student.associate = function (models) {
        student.belongsTo(models.credential, {
            foreignKey: 'id'
        });
        student.hasMany(models.grade, {
            foreignKey: 'id_student'
        })
    };
    return student;
};