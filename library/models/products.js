'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here if needed
    }
  }

  products.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    image_link: DataTypes.STRING,
    short_description: DataTypes.TEXT,
    detail: DataTypes.TEXT,
    material: DataTypes.STRING,
    weight_kg: DataTypes.FLOAT,
    stock_quantity: DataTypes.INTEGER,
    promotion: DataTypes.INTEGER,  
    branch: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products',
  });

  return products;
};
