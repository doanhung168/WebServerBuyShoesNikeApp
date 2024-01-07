var express = require('express');
var router = express.Router();
const {ImageController} = require('../../controller/ImageControlloer')

router
    .delete('/', ImageController.removeImage)
    .post('/', ImageController.addImage)




module.exports = router;