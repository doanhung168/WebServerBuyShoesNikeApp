var express = require('express');
var router = express.Router();

const { Constraint } = require('../../utlity')
const passport = require('passport')
require('../../middleware/passport')

const ShoesReviewController = require('../../controller/ShoesReviewController')

router
    .get('/', ShoesReviewController.get)
    .post('/', passport.authenticate(Constraint.JWT, { session: false }, null), ShoesReviewController.add)

module.exports = router


