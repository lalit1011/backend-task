const { check } = require('express-validator');

const { adminFetchFiles, adminFetchFile, adminUpdateFile, adminRemoveFile, adminFetchFileByAsset, adminRemoveAssetFile, adminRemoveAllFile } = require('../controllers/file')
const { filterObject, slugify } = require('../utilities/stringUtils');
const response = require('../utilities/response');

const { requestValidator } = require('../middlewares/errorHandler');

const { PERMISSIONS: { MODULE } } = require('../constants/permissions');
const { checkPermission } = require('../middlewares/permissionMiddleware');


/**
 * Express route for admin remove single file
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.fileRemove = (req, res, next) => {
    const fileId = req.params.id;

    adminRemoveFile(fileId)
        .then((data) => response.successResponse(res, 'File has been removed successfully', data))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};

/**
 * Express route for admin remove all file
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.fetchFiles = (req, res, next) => {

    adminFetchFiles()
        .then((data) => response.successResponse(res, 'Fetch all files successfully', data))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};



/**
 * Express route for admin fetch single file
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.fileIndex = (req, res, next) => {
    const fileId = req.params.id;

    adminFetchFile(fileId)
        .then((data) => response.successResponse(res, 'Fetch single file successfully', data))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};




/**
 * Express route for admin fetch all file
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.fileByAssetId = (req, res, next) => {
    const assetId = req.params.assetId;

    adminFetchFileByAsset(assetId)
        .then((data) => response.successResponse(res, 'Fetch single file successfully', data))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};


/**
 * Express route for admin remove asset file
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.remove = async (req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.ASSET.ADD)
    console.log('permission', permission)
    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }
    const assetId = req.params.assetId;
    const fileId = req.params.fileId;

    adminRemoveAssetFile(fileId, assetId)
        .then((data) => response.successResponse(res, 'File has been removed successfully', data))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};


/**
 * Express route for admin update asset file
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.update = async (req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.ASSET.ADD)
    console.log('permission', permission)
    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }
    const updatedData = req.body;
    const fileId = req.params.fileId;

    adminUpdateFile(fileId, updatedData)
        .then((data) => response.successResponse(res, 'Update file successfully', data))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};


/**
 * Express route for admin remove all file
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.removeAllFile = async (req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.ASSET.ADD)
    console.log('permission', permission)
    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }

    let fileId = req.query.fileId;
    fileId = fileId?.split(',')
    console.log('fileId', fileId)

    adminRemoveAllFile(fileId)
        .then((data) => response.successResponse(res, 'File has been removed successfully', data))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};