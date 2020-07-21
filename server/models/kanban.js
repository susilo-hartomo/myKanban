'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kanban = sequelize.define('Kanban', {
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    tag: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    due_date: DataTypes.DATEONLY,
    task_priority: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    }
  }, {});
  Kanban.associate = function (models) {
    // associations can be defined here
    Kanban.belongsTo(models.User)
  };
  return Kanban;
};