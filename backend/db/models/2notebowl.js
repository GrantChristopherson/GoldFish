'use strict';
module.exports = (sequelize, DataTypes) => {
  const NoteBowl = sequelize.define('NoteBowl', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});

  //------NoteBowl Associations------------

  NoteBowl.associate = function(models) {
    // associations can be defined here
    NoteBowl.hasMany(models.Note, { foreignKey: 'noteBowlId' });
    NoteBowl.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return NoteBowl;
};