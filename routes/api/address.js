var express = require('express');
var router = express.Router();

const AddressController = require('../../controller/AddressController')
router
  .get('/:idU',AddressController.get)
  .get('/getById/:id',AddressController.getById)
  .post('/', AddressController.create)
module.exports = router;