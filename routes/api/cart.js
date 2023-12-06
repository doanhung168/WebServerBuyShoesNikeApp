var express = require('express');
var router = express.Router();

const CartController = require('../../controller/CartController')

router
  .post('/:idU', CartController.create)
  .get('/:idU', CartController.get)
  .put('/updateAddress/:id',CartController.updateAddress)
  .put('/updateShipping/:id',CartController.updateShipping)
  .put('/updateTotalPrice/:id',CartController.updateTotalPrice)
  .delete('/deleteCart/:id',CartController.delete)
module.exports = router;