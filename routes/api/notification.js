var express = require('express');
var router = express.Router();
const NotificationController = require('../../controller/NotificationController')

const { Constraint } = require('../../utlity')
const passport = require('passport')
require('../../middleware/passport')

router
    .post('/', NotificationController.pushNoti)
    .get('/',NotificationController.get)
    .get('/get-by-id-user/', passport.authenticate(Constraint.JWT, { session: false }, null), NotificationController.getByIdUser)
    .get('/get-notification-offer',NotificationController.getNotificationOffer)
    .put('/:idN',NotificationController.updateSeenNotification)
    .get('/get-quantity-notification/:idU',NotificationController.getQuantityNotification)
module.exports = router;