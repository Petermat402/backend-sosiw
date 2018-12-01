'use strict';
module.exports = (sequelize, DataTypes) => {
  const ocena = sequelize.define('grade', {
    id_course: {
      type:DataTypes.INTEGER,
        allowNull: false,
    },
    id_student: {
      type:DataTypes.INTEGER,
        allowNull: false
    },
    value: {
      type:DataTypes.DECIMAL(2,1),
        allowNull: true
    }
  });
  ocena.associate = function(models) {
   ocena.belongsTo(models.student, {
     foreignKey: 'id'
   });
   ocena.belongsTo(models.course, {
     foreignKet: 'id'
   })
  };
  return ocena;
};