'use strict';
module.exports = (sequelize, DataTypes) => {
  const administrator = sequelize.define('administrator', {
    name: {
      type:DataTypes.STRING,
        allowNull: false
    },
    surname: {
      type:DataTypes.STRING,
        allowNull: false
    },
    pesel: {
      type: DataTypes.STRING,
        allowNull: false
    }
  });
  administrator.associate = function(models) {
      administrator.belongsTo(models.credential, {
          foreignKey: 'id'
      });
  };
  return administrator;
};