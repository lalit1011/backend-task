'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BasePermission extends Model {
    // associations can be defined here
    static associate(models) {
      // define association here
    }
  };
  BasePermission.init({
    data: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'BasePermission',
  });


  return BasePermission;
};