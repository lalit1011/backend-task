'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AdminUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: { msg: 'Email address already in use!'},
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
            }
          }
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      thumbnailImageUrl: {
        type: Sequelize.STRING
      },
      resetPasswordToken: {
        type: Sequelize.STRING
      },
      secretKey: {
        type: Sequelize.STRING
      },
      roleId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: {
        //     tableName: 'Roles',
        //     key: 'id'
        //   }
        // }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AdminUsers');
  }
};