'use strict';
module.exports = (sequelize, DataTypes) => {
  const Nauczyciel = sequelize.define('Nauczyciel', {
    id_nauczyciel: {
      type:DataTypes.INTEGER,
        allowNull: false
    },
    imie: {
      type:DataTypes.STRING,
        allowNull: false
    },
    nazwisko: {
      type:DataTypes.STRING,
        allowNull: false
    },
    pesel: {
      type:DataTypes.STRING,
        allowNull: false
    },
    email: {
      type:DataTypes.STRING,
        allowNull: false
    },
    wydzial: {
      type:DataTypes.STRING,
        allowNull: false
    }
  });
  Nauczyciel.associate = function(models) {
      Nauczyciel.belongsTo(models.credential, {
          foreignKey: 'id_osoby'
      });
      Nauczyciel.hasMany(models.przedmiot, {
        foreignKey: 'id_nauczyciel'
      })
  };
  return Nauczyciel;
};