'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {

    static associate(models) {
      // A user can have many articles
      this.hasMany(models.articles, {
        foreignKey: 'id_user',
        as: 'articles'
      });
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
