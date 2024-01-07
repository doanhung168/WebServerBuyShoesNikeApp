var express = require('express');
const UserController = require('../../controller/UserController');
var router = express.Router();
const { Constraint } = require('../../utlity')

const passport = require('passport')
require('../../middleware/passport')

router
    .post('/login', UserController.login)
    .post('/register', UserController.register)
    .post('/request_register', UserController.requestRegister)
    .post('/login-with-social-account', UserController.loginWithSocialAccount)
    .post('/forget-password', UserController.forgotPassword)
    .post('/change-pass-by-code', UserController.changePasswordByCode)
    .post('/auto-login', passport.authenticate(Constraint.JWT, { session: false }, null), UserController.autoLogin)

router
    .get('/offers', passport.authenticate(Constraint.JWT, { session: false }, null), UserController.getOfferOfUser)
    .post('/offer', passport.authenticate(Constraint.JWT, { session: false }, null), UserController.addOffer)

router
    .get('/checkFavoriteShoes', passport.authenticate(Constraint.JWT, { session: false }, null), UserController.checkFavoriteShoes)
    .get('/getFavoriteShoes', passport.authenticate(Constraint.JWT, { session: false }, null), UserController.getFavoriteShoesOfUser)
    .post('/addFavoriteShoes', passport.authenticate(Constraint.JWT, { session: false }, null), UserController.addFavoriteShoes)


router.get('/countNewUser', UserController.countNewUser)
    .get('/getUserInfo', passport.authenticate(Constraint.JWT, { session: false }, null), UserController.getUserInfo)
    .put('/updateUserInfo', passport.authenticate(Constraint.JWT, { session: false }, null), UserController.updateUserInfo)
    .get('/', UserController.get)

module.exports = router;
