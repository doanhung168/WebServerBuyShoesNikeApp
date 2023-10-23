var express = require('express');
var router = express.Router();

const ShoesController = require('../../controller/ShoesController')

router
  .post('/', ShoesController.create)
  .get('/', ShoesController.get)


module.exports = router;