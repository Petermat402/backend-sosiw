'use strict';
module.exports = (sequelize, DataTypes) => {
    const course = sequelize.define('course', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_teacher: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        academicYear: {
            type: DataTypes.STRING,
            allowNull: false
        },
        semester: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    course.associate = function (models) {
        course.belongsTo(models.user, {
            foreignKey: 'id'
        });
        course.hasMany(models.lecture, {
            foreignKey: 'id_course'
        })
    };
    return course;
};