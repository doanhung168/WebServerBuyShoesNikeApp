var express = require('express');
var router = express.Router();
const NotificationController = require('../../controller/NotificationController')

router
    .post('/', NotificationController.pushNoti)
    .get('/',NotificationController.get)
    .get('/get-by-id-user/:id_user',NotificationController.getByIdUser)
    .get('/get-notification-offer',NotificationController.getNotificationOffer)
module.exports = router;