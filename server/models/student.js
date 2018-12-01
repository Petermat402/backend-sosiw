'use strict';
module.exports = (sequelize, DataTypes) => {
    const student = sequelize.define('student', {
        /*id_student: {
            primaryKey: true,
            allowNull: false,
            type: DataTypes.INTEGER
        },*/
        imie: {
            allowNull: false,
            type: DataTypes.STRING
        },
        nazwisko: {
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
        grupa: {
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