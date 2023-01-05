const { check } = require('express-validator');
const { subAdminList, subAdminProfile, subAdminRemove } = require('../controllers/admin')
const response = require('../utilities/response');
const { requestValidator } = require('../middlewares/errorHandler');
const { NotificationEventTypes } = require('../constants/events');
const { checkPermission } = require('../middlewares/permissionMiddleware');

const { PERMISSIONS: { MODULE } } = require('../constants/permissions')
/**
 * Express route for list user
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.subAdminFetch = async (req, res, next) => {
  const permission = await checkPermission(req.adminUser.roleId, MODULE.SUB_ADMIN.VIEW)
  console.log('permission', permission)
  if (!permission || permission?.msg) {
    return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
  }
  const page = (req.query.page && req.query.page > 0) ? parseInt(req.query.page) : 1
  const limit = (req.query.limit && req.query.limit > 0) ? parseInt(req.query.limit) : 10

  subAdminList(page, limit, req.query, req.adminUser.id)
    .then((data) => response.successResponse(res, 'List of sub-admin', data))
    .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};

/**
 * Express route for fetch sub-admin profile
 *
 * @param req Request from Express
 * @param res Response from Express
 * @param next
 */
exports.fetchSubAdmin = async (req, res, next) => {
  const permission = await checkPermission(req.adminUser.roleId, MODULE.SUB_ADMIN.VIEW)
  console.log('permission', permission)
  if (!permission || permission?.msg) {
    return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
  }

  const userId = req.params.id

  subAdminProfile(userId)
    .then(profile => response.successResponse(res, 'Fetch of sub-admin', profile))
    .catch(error => response.badRequestErrorResponse(res, error.message, error))
}

/**
 * Express route for remove a sub-admin profile
 *
 * @param req Request from Express
 * @param res Response from Express
 * @param next
 */
exports.removeSubAdmin = async (req, res, next) => {
  const permission = await checkPermission(req.adminUser.roleId, MODULE.SUB_ADMIN.DELETE)
  console.log('permission', permission)
  if (!permission || permission?.msg) {
    return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
  }
  const userId = req.params.id

  subAdminRemove(userId)
    .then(profile => response.successResponse(res, 'Sub-admin is removed', profile))
    .catch(error => response.badRequestErrorResponse(res, error.message, error))
}
