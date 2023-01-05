const express = require('express');
const router = express.Router();
const {
    userAuthenticator, adminAuthenticator
} = require('../middlewares/authenticator')

const { loginMiddleware, login, forgotMiddleware, forgot, reset, recoverMiddleware, signUpMiddleware, signUp, changePassword, changePasswordMiddleware } = require('./adminAuth');
const { fetch, updateSelf,  } = require('./profile');

const { createCategory, categoryMiddleware, updateCategory, fetchCategory, categoryIndex, categoryRemove } = require('./category');

const { fetchUser, userIndex, userUpdate, userRemove, userBlock, createUser, userRegisterMiddleware, } = require('./user');

const { roleIndex, roleCreate, roleUpdate, roleFetch } = require('./role')


// Role Route
router.post('/admin/roles', adminAuthenticator, roleCreate);
router.get('/admin/roles', adminAuthenticator, roleIndex);
router.put('/admin/roles/:id', adminAuthenticator, roleUpdate);

router.get('/admin/roles/:id', adminAuthenticator, roleFetch);

router.post('/admin/signUp', [signUpMiddleware, adminAuthenticator], signUp);
router.post('/admin/auth', loginMiddleware, login);
router.post('/admin/auth/forgot', forgotMiddleware, forgot);
router.post('/admin/auth/reset', recoverMiddleware, reset);

router.put('/admin/change/password/:id', changePasswordMiddleware, changePassword);

router.get('/admin/my-profile', adminAuthenticator, fetch)
router.patch('/admin/my-profile', adminAuthenticator, updateSelf)


// Category
router.post('/admin/category', [adminAuthenticator, categoryMiddleware], createCategory);
router.patch('/admin/category/:categoryId', [adminAuthenticator, categoryMiddleware], updateCategory);
router.get('/admin/category/:categoryId', [adminAuthenticator], fetchCategory);
router.get('/admin/category', [adminAuthenticator], categoryIndex);
router.delete('/admin/category/:categoryId', [adminAuthenticator], categoryRemove);


// User
router.get('/user/:userId', [adminAuthenticator], fetchUser);
router.post('/user', [adminAuthenticator, userRegisterMiddleware], createUser);
router.get('/user', [adminAuthenticator], userIndex);
router.patch('/user/:id', [adminAuthenticator], userUpdate);

router.delete('/user/:id', [adminAuthenticator], userRemove);



module.exports = router;
