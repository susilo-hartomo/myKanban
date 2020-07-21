'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Bcryptjs } = require('../helpers/bcryptjs');
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      validate: {
        isEmail:true
      },
      unique: {
          args: true,
          msg: 'Email address already in use!'
      }
    },
    password:{
      type: DataTypes.STRING,
      len: [6,10]
    }
  }, {});

  User.beforeCreate((user) => {
    user.password = Bcryptjs.hashing(user.password)
  })

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Kanban)
  };
  return User;
};