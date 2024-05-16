'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      id_google: DataTypes.STRING,
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      image: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM,
        values: ['Administrator', 'Member'],
        allowNull: false,
        defaultValue: 'Member',
      },
      lastLoginAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'users',
    }
  );
  return users;
};
