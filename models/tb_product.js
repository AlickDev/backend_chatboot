const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tb_product extends Model {
    static associate(models) {
      tb_product.belongsTo(models.tb_category, {
        foreignKey: 'category_id',
        targetKey: 'category_id',
      });
    }
  }

  tb_product.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: {
        type: DataTypes.STRING(100),
        allowNull: false, // Set product_name as a required field

      },
      description: {
        type: DataTypes.STRING(100),
      },
      image_path: {
        type: DataTypes.STRING(100),
      },
      create_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Set product_name as a required field
        references: {
          model: 'tb_category',
          key: 'category_id',
        },
      },
    },
    {
      sequelize,
      modelName: 'tb_product',
      tableName: 'tb_product', // Replace 'tb_products' with the actual table name if necessary
      timestamps: false,
    }
  );

  return tb_product;
};
