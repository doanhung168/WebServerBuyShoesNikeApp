var express = require('express');
const AuthController = require('../../controller/AuthController');
var router = express.Router();
const { Constraint } = require('../../utlity')

const passport = require('passport')
require('../../middleware/passport')

router
    .post('/login', AuthController.login)
    .post('/register', AuthController.register)
    .post('/request_register', AuthController.requestRegister)
    .post('/login-with-social-account', AuthController.loginWithSocialAccount)
    .post('/forget-password', AuthController.forgotPassword)
    .post('/change-pass-by-code', AuthController.changePasswordByCode)
    .post('/auto-login', passport.authenticate(Constraint.JWT, { session: false }, null), AuthController.autoLogin)

module.exports = router;
