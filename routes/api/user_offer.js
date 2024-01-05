var express = require('express');
var router = express.Router();

const { Constraint } = require('../../utlity')
const passport = require('passport')
require('../../middleware/passport')

const UserOfferController = require('../../controller/UserOfferController')

router
    .get('/byUserId', passport.authenticate(Constraint.JWT, { session: false }, null), UserOfferController.getByUserId)
    .post('/', passport.authenticate(Constraint.JWT, { session: false }, null), UserOfferController.add)
    .put('/', passport.authenticate(Constraint.JWT, { session: false }, null), UserOfferController.update)

module.exports = router


