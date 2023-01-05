
const { Role, RolePermission, Permission } = require('../models/index');
const { Op } = require("sequelize");

module.exports.checkPermission = (roleId, action) => {
    return new Promise((resolve, reject) => {
        console.log('roleId',roleId)
        Role.findOne({
            where: {
                id: roleId
            },
          
        }).then((perm) => {
            let arr = action.split('_')
            console.log(perm)
            if (perm?.permission && !perm?.permission[arr[0]][0][arr[1]]) {
                return resolve({ msg: `The user is not authenticated to ${arr[1]} the ${arr[0]}` })
            }
            return resolve(perm)

        }).catch((error) => {
            console.log('error1error', error)
            return reject({ message: 'Forbidden' });
        });
    }
    );
}
