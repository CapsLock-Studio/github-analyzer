'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    publicKey: DataTypes.STRING,
    privateKey: DataTypes.STRING
  })

  return User
}
