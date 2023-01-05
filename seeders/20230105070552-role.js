const { Sequelize } = require('sequelize');
const { Role } = require('../models/index');
const { roleBasePermission } = require('../constants/role-permission');
const { Op } = Sequelize;

const arrayToUpdate = [
  {
    roleName: 'Admin',
    roleDescription: 'Admin',
    permission: {
      role: [
        {
          'add': true,
          'edit': true,
          'view': true,
          'delete': true
        }
      ],
      user: [
        {
          'add': true,
          'edit': true,
          'view': true,
          'delete': true
        }
      ],
      visitor: [
        {
          'add': true,
          'edit': true,
          'view': true,
          'delete': true
        }
      ],
      category: [
        {
          'add': true,
          'edit': true,
          'view': true,
          'delete': true
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    roleName: 'Manager',
    roleDescription: 'Manager',
    permission: {
      'role': [
        {
          'add': false,
          'edit': false,
          'view': false,
          'delete': false
        }
      ],
      'user': [
        {
          'add': true,
          'edit': true,
          'view': true,
          'delete': true
        }
      ],
      'visitor': [
        {
          'add': true,
          'edit': true,
          'view': true,
          'delete': true
        }
      ],
      'category': [
        {
          'add': false,
          'edit': false,
          'view': false,
          'delete': false
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    roleName: 'Employee',
    roleDescription: 'Employee',
    permission: {
      'role': [
        {
          'add': false,
          'edit': false,
          'view': false,
          'delete': false
        }
      ],
      'user': [
        {
          'add': false,
          'edit': false,
          'view': false,
          'delete': false
        }
      ],
      'visitor': [
        {
          'add': true,
          'edit': true,
          'view': true,
          'delete': true
        }
      ],
      'category': [
        {
          'add': false,
          'edit': false,
          'view': false,
          'delete': false
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    roleName: 'User',
    roleDescription: 'User',
    permission: {
      'role': [
        {
          'add': false,
          'edit': false,
          'view': false,
          'delete': false
        }
      ],
      'user': [
        {
          'add': false,
          'edit': false,
          'view': false,
          'delete': false
        }
      ],
      'visitor': [
        {
          'add': false,
          'edit': false,
          'view': false,
          'delete': false
        }
      ],
      'category': [
        {
          'add': false,
          'edit': false,
          'view': false,
          'delete': false
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    roleName: 'Visitor',
    roleDescription: 'Visitor',
    permission: {
      'role': [
        {
          'add': false,
          'edit': false,
          'view': false,
          'delete': false
        }
      ],
      'user': [
        {
          'add': false,
          'edit': false,
          'view': false,
          'delete': false
        }
      ],
      'visitor': [
        {
          'add': false,
          'edit': false,
          'view': false,
          'delete': false
        }
      ],
      'category': [
        {
          'add': false,
          'edit': false,
          'view': false,
          'delete': false
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface) => {
    let existRecords = await Role.findAll({
      where: {
        roleName: {
          [Op.in]: arrayToUpdate.map((recordData) => recordData.roleName),
        },
      },
      attributes: ['id', 'roleName'],
    });
   
    existRecords = existRecords.map((tableData) => tableData.toJSON());
    const filteredArr = arrayToUpdate.filter((el) => !existRecords.some((f) => f.roleName === el.roleName));
    if (filteredArr.length) {
      for await(const iterator of filteredArr) {

        await Role.create(iterator)
      }
      
    }
    return false;
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Roles', {});
    return false;
  },
};
