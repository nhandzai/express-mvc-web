'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here if needed 
    }
  }

  RefreshToken.init({
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,  
      references: {
        model: 'users', 
        key: 'id',
      },
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,  
    },
  }, {
    sequelize,
    modelName: 'RefreshToken',
  });

  return RefreshToken;
};
