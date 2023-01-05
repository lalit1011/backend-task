const { check } = require('express-validator');

const { loginAdmin, requestUserPasswordReset, resetUserPassword, verifyTOTPcode, signUpAdmin, changePwd } = require('../controllers/adminAuth')
const response = require('../utilities/response');
const { requestValidator } = require('../middlewares/errorHandler');
const { NotificationEventTypes } = require('../constants/events');
let { checkPasswordValidation } = require('../utilities/passwordValidation');
const { filterObject } = require('../utilities/stringUtils');

/**
 * Express route for logging in a user
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.loginMiddleware = [
  check('email').not().isEmpty().isEmail().withMessage('Enter a valid email address'),
  check('password').not().isEmpty().withMessage('Password is required'),
  requestValidator
]
exports.login = (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  loginAdmin(email, password)
    .then((jwtToken) => response.successResponse(res, `You have logged in successfully`, jwtToken))
    .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};



/**
 * Express route for requesting a password reset
 *
 * @param req Request from Express
 * @param res Response from Express
 * @param next
 */
exports.forgotMiddleware = [
  check('email').not().isEmpty().withMessage('Enter a valid email address'),
  requestValidator
]

exports.forgot = (req, res, next) => {
  const email = req.body.email
  var webUrl = 'https://asly-admin-dev.devtomaster.com';
  var webBaseUrl = req.protocol + '://' + req.get('host');
  if (webBaseUrl.indexOf('uat') > -1) {
    webUrl = 'http://asly-admin-uat.devtomaster.com'
  }
  requestUserPasswordReset(email)
    .then(async responseData => {
      let notification = {}

      notification.email = email,
        notification.token = responseData.token,
        notification.link = `${webUrl}/forgot-password?token=${responseData.token}&email=${email}`

      res.app.emit(NotificationEventTypes.NOTIFY_RESET_PASSWORD, notification)

      response.successResponse(res, 'Please check you mail...', notification);

    }).catch((error) => response.badRequestErrorResponse(res, error.message, error))
}


/**
 * Express route for recovering a password
 *
 * @param req Request from Express
 * @param res Response from Express
 * @param next
 */
exports.recoverMiddleware = [
  check('token').not().isEmpty().withMessage('Token is required'),
  check('password').not().isEmpty().withMessage('Password is required'),
  requestValidator
]

exports.reset = (req, res, next) => {
  const password = req.body.password
  const token = req.body.token
  let pwdValidation = checkPasswordValidation(password)
  if (!!pwdValidation) {
    return response.badRequestErrorResponse(res, pwdValidation, {})
  }
  resetUserPassword(token, password)
    .then(response => res.json(response))
    .catch((error) => response.badRequestErrorResponse(res, error.message, error))
}

/**
 * Express route for sign-in a sub-admin
 *
 * @param req Request from Express
 * @param res Response from Express
 */
exports.signUpMiddleware = [
  check('email').not().isEmpty().withMessage('Enter a valid email address'),
  check('password').not().isEmpty().withMessage('Please fill the mandatory fields'),
  check('firstName').not().isEmpty().withMessage('Please fill the mandatory fields'),
  check('lastName').not().isEmpty().withMessage('Please fill the mandatory fields'),
  check('roleId').not().isEmpty().withMessage('Please fill the mandatory fields'),
  requestValidator
]
exports.signUp = (req, res, next) => {
  const bodyData = req.body
  bodyData.email = req.body.email.toLowerCase();
  console.log('req.adminUser',req.adminUser)
  let pwdValidation = checkPasswordValidation(bodyData.password)
  if (!!pwdValidation) {
    return response.badRequestErrorResponse(res, pwdValidation, {})
  }
  
  signUpAdmin(bodyData)
    .then((jwtToken) => response.successResponse(res, 'User registration successfully', jwtToken))
    .catch((error) => response.badRequestErrorResponse(res, error.message, error))
};


/**
 * Express route for chnaged a password
 *
 * @param req Request from Express
 * @param res Response from Express
 * @param next
 */
exports.changePasswordMiddleware = [
  check('oldPassword').not().isEmpty().withMessage('Please fill the mandatory fields'),
  check('newPassword').not().isEmpty().withMessage('Please fill the mandatory fields'),
  requestValidator
]

exports.changePassword = (req, res, next) => {
  const id = req.params.id
  const bodyData = req.body
  let pwdValidation = checkPasswordValidation(bodyData.newPassword)
  if (!!pwdValidation) {
    return response.badRequestErrorResponse(res, pwdValidation, {})
  }
  changePwd(id, bodyData)
    .then(data => response.successResponse(res, 'Password changed successfully', data))
    .catch((error) => response.badRequestErrorResponse(res, error, error))
}
