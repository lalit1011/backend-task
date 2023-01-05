const { Sequelize } = require('sequelize');
const { BasePermission } = require('../models/index');

const basePermissionObj = {
  role: [
    {
      'add': false,
      'edit': false,
      'view': false,
      'delete': false
    }
  ],
  user: [
    {
      'add': false,
      'edit': false,
      'view': false,
      'delete': false
    }
  ],
  visitor: [
    {
      'add': false,
      'edit': false,
      'view': false,
      'delete': false
    }
  ],
  category: [
    {
      'add': false,
      'edit': false,
      'view': false,
      'delete': false
    }
  ]
}
module.exports = {
  up: async (queryInterface) => {
    let existRecords = await BasePermission.findOne({});

    if ((existRecords && !existRecords?.data) || !existRecords ) {
      
      await BasePermission.create({ data: basePermissionObj });
    }
    return false;
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('BasePermissions', {});
    return false;
  },
};
