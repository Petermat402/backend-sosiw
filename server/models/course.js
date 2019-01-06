'use strict';
module.exports = (sequelize, DataTypes) => {
    const przedmiot = sequelize.define('course', {
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
    przedmiot.associate = function (models) {
        przedmiot.belongsTo(models.user, {
            foreignKey: 'id'
        })
    };
    return przedmiot;
};