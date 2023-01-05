'use strict';
const tableName = 'AdminUsers';
const columns = ['publicAddress'];

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
      return Promise.all(promises);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.removeColumn(tableName, columns[0], { transaction }),
      ]);
    });
  }
};
