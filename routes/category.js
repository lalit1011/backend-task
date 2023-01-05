const { check } = require('express-validator');

const { adminCreateCategory, adminUpdateCategory, adminFetchCategory, adminFetchAllCategory, adminRemoveCategory, adminCreateSubCategory, adminFetchAllSubCategory, adminFetchSubCategory, adminUpdateSubCategory, adminRemoveSubCategory } = require('../controllers/category')
const { filterObject, slugify } = require('../utilities/stringUtils');
const response = require('../utilities/response');
const { checkPermission } = require('../middlewares/permissionMiddleware')
const { requestValidator } = require('../middlewares/errorHandler');
const { PERMISSIONS: { MODULE } } = require('../constants/permissions')
/**
 * Express route for admin create category
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.categoryMiddleware = [
    check('name', 'Please fill the mandatory fields').not().isEmpty(),
    requestValidator
]
exports.createCategory = async (req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.CATEGORY.ADD)
    console.log('permission',permission)
    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }
    const bodyData = filterObject(req.body, ['name']);

    bodyData.slug = slugify(bodyData.name);

    adminCreateCategory(bodyData)
        .then((category) => response.successResponse(res, 'Category created successfully', category))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};

/**
 * Express route for admin update category
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.categoryMiddleware = [
    check('name', 'Please fill the mandatory fields').not().isEmpty(),
    requestValidator
]
exports.updateCategory = async (req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.CATEGORY.EDIT)
    
    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }

    const bodyData = filterObject(req.body, ['name']);

    bodyData.slug = slugify(bodyData.name);

    const categoryId = req.params.categoryId;

    adminUpdateCategory(categoryId, bodyData)
        .then((category) => response.successResponse(res, 'Category updated successfully', category))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};


/**
 * Express route for admin fetch single category
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.fetchCategory = async (req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.CATEGORY.VIEW)
    console.log(req.adminUser)
    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }
    const categoryId = req.params.categoryId;

    adminFetchCategory(categoryId)
        .then((category) => response.successResponse(res, 'Fetch single category successfully', category))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};

/**
 * Express route for admin all category
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.categoryIndex = async (req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.CATEGORY.VIEW)
    
    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }
    const page = (req.query.page && req.query.page > 0) ? parseInt(req.query.page) : 1
    const limit = (req.query.limit && req.query.limit > 0) ? parseInt(req.query.limit) : 10
    adminFetchAllCategory(page, limit, req.query)
        .then((category) => response.successResponse(res, 'Fetch all category successfully', category))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};


/**
 * Express route for admin remove single category
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.categoryRemove = async (req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.CATEGORY.DELETE)
    
    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }
    const categoryId = req.params.categoryId;

    adminRemoveCategory(categoryId)
        .then((category) => response.successResponse(res, 'Category has been removed successfully', category))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};



/**
 * Express route for admin create sub-category
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.subCategoryMiddleware = [
    check('name', 'Please fill the mandatory fields').not().isEmpty(),
    check('categoryId', 'Category Id is required.').not().isEmpty(),

    requestValidator
]
exports.createSubCategory = async (req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.CATEGORY.ADD)
    
    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }
    const bodyData = filterObject(req.body, ['categoryId', 'name']);

    adminCreateSubCategory(bodyData)
        .then((data) => response.successResponse(res, 'Subcategory created successfully', data))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};

/**
 * Express route for admin all sub-category
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.subCategoryIndex = async (req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.CATEGORY.VIEW)
    
    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }
    const page = (req.query.page && req.query.page > 0) ? parseInt(req.query.page) : 1
    const limit = (req.query.limit && req.query.limit > 0) ? parseInt(req.query.limit) : 10
    adminFetchAllSubCategory(page, limit, req.query)
        .then((subCategory) => response.successResponse(res, 'Fetch all sub-category successfully', subCategory))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};


/**
 * Express route for admin single sub-category
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.subCategoryFetch = async (req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.CATEGORY.VIEW)
    
    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }
    const id = req.params.id

    adminFetchSubCategory(id)
        .then((subCategory) => response.successResponse(res, 'Fetch sub-category successfully', subCategory))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};

/**
 * Express route for admin update sub category
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.subCategoryMiddleware = [
    check('name', 'Please fill the mandatory fields').not().isEmpty(),
    check('categoryId', 'CategoryId is required.').not().isEmpty(),
    requestValidator
]
exports.updateSubCategory = async (req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.CATEGORY.EDIT)
    
    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }
    const bodyData = filterObject(req.body, ['name', 'categoryId']);
    const id = req.params.id;

    adminUpdateSubCategory(id, bodyData)
        .then((category) => response.successResponse(res, 'Sub-category updated successfully', category))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};

/**
 * Express route for admin remove single sub category
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.subcategoryRemove = async (req, res, next) => {
    const permission = await checkPermission(req.adminUser.roleId, MODULE.CATEGORY.DELETE)
    
    if (!permission || permission?.msg) {
        return response.authorizationErrorResponse(res, permission?.msg ? permission?.msg : 'User does not have permission to access this end point.')
    }
    const subCategoryId = req.params.id;

    adminRemoveSubCategory(subCategoryId)
        .then((subCategory) => response.successResponse(res, 'Subcategory has been removed successfully', subCategory))
        .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};