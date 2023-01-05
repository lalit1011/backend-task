const bcrypt = require('bcrypt');
const { Op } = require("sequelize");

const { AdminUser, Role } = require('../models/index');
const { getPagingDataNew } = require('../utilities/pagination');
const { fetchPermissionByRoleId } = require('../controllers/role')

exports.subAdminList = (page, limit, { search, fromDate, toDate, isBlock }, userId) => {

    return new Promise((resolve, reject) => {

        const offset = page === 1 ? 0 : limit * (page - 1);
        const where = { isDeleted: false, id: { [Op.ne]: userId } };

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
            include: {
                model: Role,
                as: 'roles',
                attributes: { exclude: ['roleDescription', 'updatedAt', 'createdAt'] }
            },
            attributes: { exclude: ['password'] },
            order: [
                ['updatedAt', 'DESC']
            ]

        }).then(async subAdmin => {
            if (subAdmin.length === 0) {
                return reject(new Error(`Sub-admin not found.`));
            }
            const subAdminData = getPagingDataNew(subAdmin, page, limit, 'data');

            return resolve(subAdminData);
        }).catch((error) => reject(new Error(error)));
    });
}



exports.subAdminProfile = (id) => {
    return new Promise((resolve, reject) => {

        AdminUser.findOne({
            where: { id },
            include: {
                model: Role,
                as: 'roles',
                attributes: { exclude: ['roleDescription', 'updatedAt', 'createdAt'] }
            },
            attributes: { exclude: ['password', 'resetPasswordToken', 'createdAt', 'status', 'secretKey'] },
        }).then(async user => {
            if (!user) {
                reject(new Error(`Sub-admin not found`));
            } else {

                resolve(user);
            }
        }).catch((error) => reject(error));
    });

};

exports.subAdminRemove = (id) => {
    return new Promise((resolve, reject) => {

        AdminUser.update({ isDeleted: true }, {
            where: { id }
        }).then(async user => {
            if (!user) {
                reject(new Error(`Sub-admin not found`));
            } else {
                resolve(user);
            }
        }).catch((error) => reject(error));
    });

};