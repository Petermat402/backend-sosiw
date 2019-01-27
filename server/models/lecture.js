'use strict';
module.exports = (sequelize, DataTypes) => {
    const lecture = sequelize.define('lecture', {
        id_course: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        start_hour: {
            type: DataTypes.DATE,
            allowNull: false
        },
        group: {
            type: DataTypes.STRING,
            allowNull: false
        },
        room: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    lecture.associate = function (models) {
        lecture.belongsTo(models.course, {
            foreignKey: 'id'
        })
    };
    return lecture;
};