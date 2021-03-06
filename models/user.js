'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8, 99]
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        models.user.hasMany(models.tweet);
      }
    },
    hooks: {
      beforeCreate: function(user, options, callback) {
        if (user.password) {
          // hash the plaintext password before saving.
          bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) return callback(err);
            user.password = hash;
            callback(null, user);
          });
        } else {
          callback(null, user)
        }
      }
    }
  });
  return user;
};