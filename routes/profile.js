const { check } = require('express-validator');

const { fetchProfileById, updateUserProfile, updateSubAdminProfile }  =  require('../controllers/profile');
const { requestValidator } = require('../middlewares/errorHandler');
const response = require('../utilities/response');
const { filterObject } = require('../utilities/stringUtils');

/**
 * Express route for fetching a user's profile by id
 *
 * @param req Request from Express
 * @param res Response from Express
 * @param next
 */
exports.fetch = (req, res, next) => {
    const userId = req.adminUser.id
    console.log(req.adminUser)
    fetchProfileById(userId)
        .then(profile => response.successResponse(res, 'Fetch admin profile successfully', profile))
        .catch(error => next(error))
}


/**
 * Express route for updating a user's self profile
 *
 * @param req Request from Express
 * @param res Response from Express
 * @param next
 */
exports.updateMiddleware = [
    requestValidator
]
exports.updateSelf = (req, res, next) => {
    // const updatedProfile = filterObject(req.body, ['email'])
    const userId = req.adminUser.id
    updateUserProfile(userId, req.body)
        .then(profile => res.json(profile))
        .catch(error => next(error))
}

/**
 * Express route for updating a sub-admin profile
 *
 * @param req Request from Express
 * @param res Response from Express
 * @param next
 */
 exports.updateProfileMiddleware = [
    check('email').not().isEmpty().withMessage('Enter a valid email address'),
    check('firstName').not().isEmpty().withMessage('Please fill the mandatory fields'),
    check('lastName').not().isEmpty().withMessage('Please fill the mandatory fields'),
    check('permission').not().isEmpty().withMessage('Please fill the mandatory fields'),
    requestValidator
  ]
exports.updateSubAdmin = (req, res, next) => {
    const updatedProfile = req.body
    const userId = req.params.id
    const permissionObj = filterObject(updatedProfile.permission, ['analytic-dashboard', 'asset', 'auction',  'category', 'commission', 'news', 'order', 'sub-admin', 'transaction-history', 'user'])
    
    updatedProfile.permission = permissionObj
    updateSubAdminProfile(userId, updatedProfile)
        .then(profile => response.successResponse(res, 'Sub-admin profile updated successfully', profile))
        .catch(error => response.badRequestErrorResponse(res, error.message, error))
}

