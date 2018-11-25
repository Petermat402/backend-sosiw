'use strict';
module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        id_student: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
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
        wydzial: {
            allowNull: false,
            type: DataTypes.STRING
        }
    });
    Student.associate = function (models) {
        Student.belongsTo(models.credential, {
            foreignKey: 'id_osoby'
        });
        Student.hasMany(models.ocena, {
            foreignKey: 'id_student'
        })
    };
    return Student;
};