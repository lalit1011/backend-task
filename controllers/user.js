const { Op } = require('sequelize');
var _ = require('lodash');
const { AdminUser } = require('../models/index');
const { getPagingDataNew } = require('../utilities/pagination');

exports.adminFetchUser = (userId) => {

  return new Promise((resolve, reject) => {

    AdminUser.findOne({ where: { id: userId }, attributes: { exclude: ['password'] } }).then(user => {
      if (!user) {
        return reject(new Error(`User not found.`));
      }
      return resolve(user);
    }).catch((error) => reject(new Error(`Something went wrong!.`)));
  });
}

exports.adminFetchAllUser = (page, limit, { search, fromDate, toDate, isBlock }) => {

  return new Promise((resolve, reject) => {

    let offset = page === 1 ? 0 : limit * (page - 1);
    const where = { isDeleted: false };
  
    if (isBlock) {
      where[Op.or] = [
        {
          isBlock: isBlock
        }
      ]
    }
    if (search) {
      where[Op.or] = [
        {
          firstName: {

            [Op.iLike]: `%${search}%`
          }
        },
        {
          lastName: {

            [Op.iLike]: `%${search}%`
          }
        },
        {
          userName: {

            [Op.iLike]: `%${search}%`
          }
        },
        {
          email: {
            [Op.iLike]: `%${search}%`
          }
        },
        {
          publicAddress: {
            [Op.iLike]: `%${search}%`
          }
        }
      ]
    }
    if (toDate && fromDate) {
      where['createdAt'] = {
        [Op.between]: [
          fromDate,
          toDate
        ]
      }
    }
    AdminUser.findAndCountAll({
      where,
      limit: limit,
      offset: offset,
      attributes: { exclude: ['password'] },
      order: [
        ['createdAt', 'DESC']
      ]

    }).then(async user => {
      if (user.length === 0) {
        return reject(new Error(`User not found.`));
      }
      const response = getPagingDataNew(user, page, limit, 'users');

      return resolve({...response, totalUsers: response.totalItems});
    }).catch((error) => reject(new Error(error)));
  });
}

exports.adminUpdateUser = (id, updateData) => {

  return new Promise((resolve, reject) => {


    AdminUser.update(updateData, {
      where: { id: id }
    }).then(user => {

      if (user != 1) {
        return reject(new Error(`User not found`));
      } else {
        return resolve(AdminUser.findOne({ where: { id: id } }));
      }

    }).catch((error) => {
      console.log('error', error)
      return reject('Failed to update')
    });
  });

}

exports.adminCreateUser = (bodyData) => {

  return new Promise(async (resolve, reject) => {
    const already = await AdminUser.findOne({ where: { email: bodyData.email }, raw: true })
    if (already) {
      return reject({
        message: `Given email address is already registered.`,
        status: 401,
      })
    }

    AdminUser.create(bodyData).then(user => {

      if (!user) {
        return reject(new Error(`User not created.`));
      } else {
        return resolve(user);
      }

    }).catch((error) => {
      console.log('error1', error)
      return reject(error)
    });
  });

}

exports.adminRemoveUser = (id) => {

  return new Promise((resolve, reject) => {


    AdminUser.update({ isDeleted: true }, {
      where: { id: id }
    }).then(user => {

      if (user != 1) {
        return reject(new Error(`User not found`));
      } else {
        return resolve(AdminUser.findOne({ where: { id: id } }));
      }

    }).catch((error) => {
      console.log('error', error)
      return reject('Failed to delete')
    });
  });

}