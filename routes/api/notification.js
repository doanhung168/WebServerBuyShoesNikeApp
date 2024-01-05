var express = require('express');
var router = express.Router();
const NotificationController = require('../../controller/NotificationController')

router
    .post('/', NotificationController.pushNoti)
    .get('/',NotificationController.get)

module.exports = router;