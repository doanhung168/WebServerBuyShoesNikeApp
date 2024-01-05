var express = require('express');
var router = express.Router();

const { Constraint } = require('../../utlity')
const passport = require('passport')
require('../../middleware/passport')

const OrderController = require('../../controller/OrderController')

router
    .get('/getById', OrderController.getById)
    .get('/getById', passport.authenticate(Constraint.JWT, { session: false }, null), OrderController.getById)
    .get('/getByStatus', passport.authenticate(Constraint.JWT, { session: false }, null), OrderController.getByStatus)
    .get('/getByUserId', passport.authenticate(Constraint.JWT, { session: false }, null), OrderController.getByUserId)
    .put('/cancelOrder', passport.authenticate(Constraint.JWT, { session: false }, null), OrderController.cancelOrder)
    .put('/completeOrder', OrderController.completeOrder)
    .post('/byRawData', passport.authenticate(Constraint.JWT, { session: false }, null), OrderController.createByRawData)
    .post('/', passport.authenticate(Constraint.JWT, { session: false }, null), OrderController.create)
    .put('/', OrderController.update)
    .get('/', OrderController.get)

module.exports = router


