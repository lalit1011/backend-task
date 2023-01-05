const { Sequelize } = require('sequelize');
const { AdminUser, UserRole, BasePermission, Role } = require('../models/index');

const { Op } = Sequelize;

const insertUserObj = {
  firstName: 'admin',
  lastName: 'test',
  email: 'admin@example.com',
  status: 'active',
  password: '123456'
}

module.exports = {
  up: async (queryInterface) => {
    let existRecords = await AdminUser.findOne({
      where: {
        email: insertUserObj.email
      },
      attributes: ['id', 'email'],
    });

    let getRole = await Role.findOne({ where: { roleName: 'Admin' }, raw: true });
    if (!existRecords) {
      let created = await AdminUser.create(insertUserObj);
      await UserRole.create({
        roleId: getRole.id,
        userId: created.id
    })
    }
    return false;
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('AdminUsers', {});
    return false;
  },
};
