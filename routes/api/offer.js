var express = require('express');
var router = express.Router();

const OfferController = require('../../controller/OfferController')

router
  .post('/', OfferController.add)
  .get('/', OfferController.get)
  .put('/', OfferController.update)

router
  .get('/get-available-offer', OfferController.getAvailableOfferList)

module.exports = router;