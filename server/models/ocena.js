'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ocena = sequelize.define('Ocena', {
    id_przedmiot: {
      type:DataTypes.INTEGER,
        allowNull: false,
    },
    id_student: {
      type:DataTypes.INTEGER,
        allowNull: false
    },
    wartosc: {
      type:DataTypes.DECIMAL(2,1),
        allowNull: true
    }
  });
  Ocena.associate = function(models) {
   Ocena.belongsTo(models.student, {
     foreignKey: 'id_student'
   });
   Ocena.belongsTo(models.przedmiot, {
     foreignKet: 'id_przedmiot'
   })
  };
  return Ocena;
};