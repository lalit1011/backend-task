'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: { msg: 'Username is already taken' },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: { msg: 'Email address is already taken'},
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          }
        }
      },
      publicAddress: {
        type: Sequelize.STRING
      },
      profilePicUrl: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      isBlock: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Users');
  }
};
