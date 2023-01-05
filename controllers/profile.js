const { Op } = require("sequelize");

const { AdminUser, Role } = require('../models/index');
exports.fetchProfileById = (id) => {
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
                reject(new Error(`User not found`));
            } else {
                resolve(user);
            }
        }).catch((error) => reject(error));
    });

};


exports.updateUserProfile = (userId, bodyData) => {
    return new Promise((resolve, reject) => {
        AdminUser.update(bodyData, {
            where: { id: userId }
        }).then(async user => {
            if (!user) {
                reject(new Error(`User not found`));
            } else {
                resolve(user);
            }

        }).catch((error) => {
            console.log('error', error)
            reject('Failed to update')
        });
    });

};
exports.updateSubAdminProfile = (userId, bodyData) => {
    return new Promise(async (resolve, reject) => {
        const already = await AdminUser.findOne({ where: { id: { [Op.ne]: userId }, email: bodyData.email } })
        if (already) {
            return reject({
                message: `Given email address is already registered.`,
                status: 401,
            })
        }

        AdminUser.update(bodyData, {
            where: { id: userId }
        }).then(async user => {
            if (!user) {
                return reject(new Error(`User not found`));
            } else {
                return resolve(user);
            }
        }).catch((error) => {
            console.log('error', error)
            return reject(new Error('Failed to update'))
        });
    });

};
