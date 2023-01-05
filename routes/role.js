const { check } = require('express-validator');
const { createRole, adminUpdateRole, adminFetchRole, adminFetchFiles, fetchRolesList } = require('../controllers/role');
const response = require('../utilities/response');
const { checkPermission } = require('../middlewares/permissionMiddleware')
const { PERMISSIONS: { MODULE } } = require('../constants/permissions')

const { requestValidator } = require('../middlewares/errorHandler');

/**
 * Express route for admin all role
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.roleIndex = async (req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.ROLE.VIEW)

    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }
    adminFetchFiles()
        .then((roles) => response.successResponse(res, 'Fetch all role successfully', roles))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};

/**
 * Express route for admin create role
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.roleCreate = async (req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.ROLE.ADD)

    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }
    createRole(req.body)
        .then((roles) => response.successResponse(res, 'Role creation successfully', roles))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};

/**
 * Express route for admin update role
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.roleUpdate = async(req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.ROLE.EDIT)

    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }
    adminUpdateRole(req.params.id, req.body)
        .then((updateRole) => response.successResponse(res, 'Role update successfully', updateRole))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};


/**
 * Express route for admin fetch role
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.roleFetch = async(req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.ROLE.VIEW)

    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }
    adminFetchRole(req.params.id)
        .then((role) => response.successResponse(res, 'Role fetch successfully', role))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};
