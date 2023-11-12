var express = require('express');
var router = express.Router();
const ShippingController = require('../../controller/ShippingController')
router
.post('/', ShippingController.create)
.get('/', ShippingController.get)
.get('/getById/:id',ShippingController.getById)


module.exports = router;