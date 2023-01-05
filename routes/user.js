const { check } = require('express-validator');

const { adminFetchUser, adminFetchAllUser, adminUpdateUser, adminRemoveUser,  adminCreateUser } = require('../controllers/user')
const { filterObject, slugify } = require('../utilities/stringUtils');
const response = require('../utilities/response');

const { requestValidator } = require('../middlewares/errorHandler');
const { checkPermission } = require('../middlewares/permissionMiddleware')
const { PERMISSIONS: { MODULE } } = require('../constants/permissions')

/**
 * Express route for admin fetch single user
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.fetchUser = async (req, res, next) => {
    const userId = req.params.userId;
    const permission = await checkPermission(req.adminUser.roleId, MODULE.USER.VIEW)

    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }
    adminFetchUser(userId)
        .then((category) => response.successResponse(res, 'Fetch single user successfully', category))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};

/**
 * Express route for admin all user
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.userIndex = async (req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.USER.VIEW)

    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }
    const page = (req.query.page && req.query.page > 0) ? parseInt(req.query.page) : 1
    const limit = (req.query.limit && req.query.limit > 0) ? parseInt(req.query.limit) : 10
    adminFetchAllUser(page, limit, req.query)
        .then((users) => {

            return response.successResponse(res, 'Fetch all user successfully', users);
        })
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};


/**
 * Express route for admin update user
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.userUpdate = async (req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.USER.EDIT)

    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }

    const updateData = req.body;

    adminUpdateUser(req.params.id, updateData)
        .then((user) => response.successResponse(res, 'User updated successfully', user))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};

/**
 * Express route for admin remove user
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.userRemove = async (req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.USER.DELETE)

    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }
    adminRemoveUser(req.params.id)
        .then((user) => response.successResponse(res, 'User deleted successfully', user))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};


/**
 * Express route for admin create user
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.userRegisterMiddleware = [
    check('email').not().isEmpty().isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty().withMessage('Password is required'),
    requestValidator
]
exports.createUser = async (req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.USER.EDIT)

    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }
    adminCreateUser(req.body)
        .then((user) => response.successResponse(res, 'User updated successfully', user))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};