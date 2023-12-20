var express = require('express');
var router = express.Router();

const { Constraint } = require('../../utlity')
const passport = require('passport')
require('../../middleware/passport')

const OrderDetailController = require('../../controller/OrderDetailController')

router
  .post('/', passport.authenticate(Constraint.JWT, { session: false }, null), OrderDetailController.create)
  .get('/get-by-user-id', passport.authenticate(Constraint.JWT, { session: false }, null), OrderDetailController.getOrderDetailListByUser)
  .delete('/', passport.authenticate(Constraint.JWT, { session: false }, null), OrderDetailController.delete)
  .put('/', passport.authenticate(Constraint.JWT, { session: false }, null), OrderDetailController.update)

module.exports = router;