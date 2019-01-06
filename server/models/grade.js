'use strict';
module.exports = (sequelize, DataTypes) => {
    const grade = sequelize.define('grade', {
        id_course: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_student: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        value: {
            type: DataTypes.DECIMAL(2, 1),
            allowNull: true
        },
        term: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    });
    grade.associate = function (models) {
        grade.belongsTo(models.user, {
            foreignKey: 'id'
        });
        grade.belongsTo(models.course, {
            foreignKey: 'id'
        })
    };
    return grade;
};