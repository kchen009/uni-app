'use strict';
module.exports = (sequelize, DataTypes) => {
  const AuthPayload = sequelize.define('AuthPayload', {
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {});
  AuthPayload.associate = function(models) {
    // associations can be defined here
  };
  return AuthPayload;
};