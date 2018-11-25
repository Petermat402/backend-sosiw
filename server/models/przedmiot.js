'use strict';
module.exports = (sequelize, DataTypes) => {
  const Przedmiot = sequelize.define('Przedmiot', {
    id_przedmiot: {
      type:DataTypes.INTEGER,
        allowNull: false
    },
    nazwa: {
      type:DataTypes.STRING,
        allowNull: false
    },
    id_nauczyciel: {
      type:DataTypes.INTEGER,
        allowNull: false
    }
  });
  Przedmiot.associate = function(models) {
    Przedmiot.belongsTo(models.nauczyciel, {
      foreignKey: 'id_nauczyciel'
    })
  };
  return Przedmiot;
};