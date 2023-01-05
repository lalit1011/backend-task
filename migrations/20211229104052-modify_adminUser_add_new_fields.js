'use strict';
const tableName = 'AdminUsers';
const columns = ['firstName', 'lastName', 'roleId', 'isScan', 'isDeleted'];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDefinition = await queryInterface.describeTable(tableName);
    const promises = [];
    return queryInterface.sequelize.transaction((transaction) => {
      if (!tableDefinition[columns[0]]) {
        promises.push(queryInterface.addColumn(
          tableName,
          columns[0],
          {
            type: Sequelize.STRING
          },
          { transaction },
        ));
      }
      if (!tableDefinition[columns[1]]) {
        promises.push(queryInterface.addColumn(
          tableName,
          columns[1],
          {
            type: Sequelize.STRING
          },
          { transaction },
        ));
      }
      if (!tableDefinition[columns[2]]) {
        promises.push(queryInterface.addColumn(
          tableName,
          columns[2],
          {
            type: Sequelize.INTEGER
          },
          { transaction },
        ));
      }
      if (!tableDefinition[columns[3]]) {
        promises.push(queryInterface.addColumn(
          tableName,
          columns[3],
          {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
          },
          { transaction },
        ));
      }
      if (!tableDefinition[columns[4]]) {
        promises.push(queryInterface.addColumn(
          tableName,
          columns[4],
          {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
          },
          { transaction },
        ));
      }
      return Promise.all(promises);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.removeColumn(tableName, columns[0], { transaction }),
        queryInterface.removeColumn(tableName, columns[1], { transaction }),
        queryInterface.removeColumn(tableName, columns[2], { transaction }),
        queryInterface.removeColumn(tableName, columns[3], { transaction }),
        queryInterface.removeColumn(tableName, columns[4], { transaction }),
      ]);
    });
  }
};
