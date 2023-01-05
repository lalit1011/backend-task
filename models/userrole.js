'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
      UserRole.belongsTo(models.AdminUser, {
        as: 'userInfo',
        foreignKey: 'userId',
        targetKey: 'id',
      });
      UserRole.belongsTo(models.Role, {
        as: 'roleInfo',
        foreignKey: 'roleId',
        targetKey: 'id',
      });
    }
  }
  UserRole.init({
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Roles',
          key: 'id'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'UserAdmin',
          key: 'id'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'UserRole',
  });

  return UserRole;
};
