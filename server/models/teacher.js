'use strict';
module.exports = (sequelize, DataTypes) => {
    const nauczyciel = sequelize.define('teacher', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pesel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        departament: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    nauczyciel.associate = function (models) {
        nauczyciel.belongsTo(models.credential, {
            foreignKey: 'id'
        });
        nauczyciel.hasMany(models.course, {
            foreignKey: 'id_teacher'
        })
    };
    return nauczyciel;
};