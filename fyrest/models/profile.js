'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      })
    }
  };
  Profile.init({
    user_id: DataTypes.INTEGER,
    sex: DataTypes.STRING,
    age: DataTypes.INTEGER,
    profession: DataTypes.STRING,
    hobby: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};