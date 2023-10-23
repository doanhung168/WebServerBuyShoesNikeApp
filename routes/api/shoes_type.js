var express = require('express');
var router = express.Router();

const ShoesTypeController = require('../../controller/ShoesTypeController')

router
  .post('/', ShoesTypeController.create)
  .get('/', ShoesTypeController.get)

module.exports = router;