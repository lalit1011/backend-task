'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
    }
  };
  Role.init({
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    roleDescription:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    permission: {
      type: DataTypes.JSONB
    },
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};
