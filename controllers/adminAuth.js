const bcrypt = require('bcrypt');
const { PERMISSIONS: { ROLES: { SUPER_ADMIN, DEFAULT_ROLE } } } = require('../constants/permissions')
const { AdminUser, UserRole } = require('../models/index');
const { generateAccessToken } = require('../utilities/authentication');
const { generateToken } = require('../utilities/cryptoUtil');
const { adminFetchRole } = require('./role');
const { roleBasePermission } = require('../constants/role-permission');

exports.loginAdmin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = null;
        try {
            foundUser = await AdminUser.findOne({ where: { email } });
        } catch (error) {
            return reject(error);
        }
        if (foundUser) {
            if (foundUser?.isDeleted) {
                return reject(new Error('User not found.'));
            }
            if (foundUser?.status != 'active') {
                return reject(new Error('Your account is not active...pls contact to ADMIN')
                );
            }
            console.log(foundUser.email)
           
            if (foundUser.email === email) {
                if (await foundUser.validPassword(password)) {
                    return resolve({ ...await generateAccessToken('adminUser', { id: foundUser.id, email: foundUser.email, role: foundUser.role }) });
                }
                else {
                    return reject(new Error(`Failed to login`));
                }
            } else {
                return reject(new Error(`User not found`));
            }

        } else {
            return reject(new Error(`User not found`));
        }

    });

};

/**
 * Reset use password by their email
 *
 * @param email
 */
exports.requestUserPasswordReset = (email) => {
    return new Promise((resolve, reject) => {
        AdminUser.findOne({ where: { email: email.toLowerCase() } })
            .then(async (user) => {
                if (!user) { return reject(new Error(`User not found`)) } else {
                    const token = await generateToken()
                    user.resetPasswordToken = token
                    user.save().then(() => resolve({ token }))
                }
            }).catch((error) => {
                console.log(error)
                return reject(new Error('Failed to update'))
            })
    })
}

/**
 * Recover a user password by their reset token and password
 *
 * @param token
 * @param password
 */
exports.resetUserPassword = (token, password) => {
    return new Promise(async (resolve, reject) => {
        AdminUser.findOne({ where: { resetPasswordToken: token } })
            .then(async (user) => {
                if (!user) { reject(new Error('This link is expired')) } else {
                    const hash = await bcrypt.hash(password, 10);
                    user.password = hash;
                    user.resetPasswordToken = null
                    user.isScan = false
                    user.save().then((newUser) => {

                        if (!newUser) { reject((new Error('Failed to update'))) } else {
                            resolve('Password has been changed successfully');
                        }
                    })
                }
            }).catch((error) => reject(new Error('Failed to creation.', error)))
    })
}


exports.signUpAdmin = (data) => {
    return new Promise(async (resolve, reject) => {
        let role = data?.role ? data.role : DEFAULT_ROLE;

        const permissionData = roleBasePermission[role];
        delete data?.permission
        const already = await AdminUser.findOne({ where: { email: data.email }, raw: true })
        if (already) {
            return reject({
                message: `Given email address is already registered.`,
                status: 401,
            })
        }
        AdminUser.create({ ...data, role, status: 'active' }).then(async savedUser => {

            await UserRole.create({
                roleId: data.roleId,
                userId: savedUser.id
            })
            return resolve(savedUser);
        }).catch((error) => {
            console.log('error', error)
            reject(error)
        });
    });

};

exports.changePwd = (id, bodyData) => {
    return new Promise(async (resolve, reject) => {
        AdminUser.findOne({ where: { id } })
            .then(async (user) => {
                if (!user) { reject(new Error('User not found')) } else {
                    if (await user.validPassword(bodyData.oldPassword)) {
                        const hash = await bcrypt.hash(bodyData.newPassword, 10);
                        user.password = hash;
                        user.isScan = false;
                        user.save().then((updated) => {

                            if (!updated) { reject(new Error('Failed to update')) } else {
                                return resolve(null);
                            }
                        })
                    } else {
                        return reject('Please enter correct old password')
                    }

                }
            }).catch((error) => reject(new Error(error)))
    })
}