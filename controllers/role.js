const { Op } = require('sequelize');
const _ = require('lodash');

const { Role, Permission } = require('../models/index');


exports.createRole = (data) => {

    return new Promise(async (resolve, reject) => {
        await Role.create(data)
            .then(savedRole => {
                if (!savedRole) {
                    return reject('Failed to role creation')
                }

                return resolve(savedRole)
            }).catch((error) => reject(new Error(error)));

    });
}

exports.adminUpdateRole = (id, updatedData) => {

    return new Promise((resolve, reject) => {

        Role.update(updatedData, { where: { id: id } }).then(role => {
            if (role == 1) {
                return resolve(role);

            } else {
                return reject(new Error(`Fail to update Role`));
            }

        }).catch((error) => {
            console.log('error', error)
            return reject('Fail to update file')
        });
    });
}


exports.adminFetchRole = (roleId) => {

    return new Promise((resolve, reject) => {

        const whereCondition = { id: roleId }
        Role.findOne({
            where: whereCondition,
        }).then(async role => {
            if (!role) {
                return resolve(`Role not found.`);
            }

            return resolve(role);
        }).catch((error) => reject(new Error(error)));
    });
}


exports.adminFetchFiles = () => {

    return new Promise((resolve, reject) => {

        Role.findAll({
        }).then(roles => {
            if (roles.length === 0) {
                return resolve(`Role not found.`);
            }
            return resolve(roles);
        }).catch((error) => reject(new Error(error)));
    });
}

// Fetch Permissions Object
exports.fetchPermissionByRoleId = (roleId) => {
    return new Promise((resolve, reject) => {
        Role.findOne({
            where: {
                id: roleId
            },
        }).then((perm) => {
            return resolve(perm)

        }).catch((error) => {
            console.log('error1error', error)
            return reject({ message: 'Forbidden' });
        });
    }
    );
}
