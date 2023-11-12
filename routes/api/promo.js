var express = require('express');
var router = express.Router();

const PromoController = require('../../controller/PromoController')

router
  .post('/', PromoController.create)
  .get('/', PromoController.get)

module.exports = router;