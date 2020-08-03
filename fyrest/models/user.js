'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, {
        foreignKey: 'user_id',
        as: 'profile',
        onDelete: 'CASCADE',
        hooks: true,
      })
      // User.hasMany(models.Profile, {
      //   foreignKey: 'user_id',
      //   as: 'profile',
      //   onDelete: 'CASCADE',
      //   hooks: true,
      // })
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.STRING,
    nickname: DataTypes.STRING,
    role: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};