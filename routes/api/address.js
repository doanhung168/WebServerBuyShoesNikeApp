var express = require('express');
var router = express.Router();

const { Constraint } = require('../../utlity')
const passport = require('passport')
require('../../middleware/passport')

const AddressController = require('../../controller/AddressController')

router
  .get('/geDefaultAddressByUserID', passport.authenticate(Constraint.JWT, { session: false }, null), AddressController.geDefaultAddressByUserID)
  .get('/getByUserID', passport.authenticate(Constraint.JWT, { session: false }, null), AddressController.getByUserID)
  .post('/', passport.authenticate(Constraint.JWT, { session: false }, null), AddressController.create)
  .put('/', passport.authenticate(Constraint.JWT, { session: false }, null), AddressController.update)
  .delete('/:id', passport.authenticate(Constraint.JWT, { session: false }, null), AddressController.delete)
module.exports = router;