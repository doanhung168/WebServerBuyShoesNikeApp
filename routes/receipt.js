var express = require('express');
var router = express.Router();
const ReceiptController = require('../../controller/ReceiptController')

router.
post('/',ReceiptController.create)
module.exports = router;