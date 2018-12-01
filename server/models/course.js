'use strict';
module.exports = (sequelize, DataTypes) => {
  const przedmiot = sequelize.define('course', {
    nazwa: {
      type:DataTypes.STRING,
        allowNull: false
    },
    id_teacher: {
      type:DataTypes.INTEGER,
        allowNull: false
    }
  });
  przedmiot.associate = function(models) {
    przedmiot.belongsTo(models.teacher, {
      foreignKey: 'id'
    })
  };
  return przedmiot;
};