'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tb_category extends Model {
    static associate(models) {
      // Define associations here
    }
  };

  tb_category.init({
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING(50),
    },
  }, {
    sequelize,
    modelName: 'tb_category',
    tableName: 'tb_category',
    timestamps: false,
  });

  return tb_category;
};
