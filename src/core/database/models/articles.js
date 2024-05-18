'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class articles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users, {
        foreignKey: 'id_user',
        as: 'users'
      });
    }
  }
  articles.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    slug: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    id_user: {
      type: DataTypes.STRING,
      references: {
        model: 'users',
        primaryKey: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'articles',
  });
  return articles;
};