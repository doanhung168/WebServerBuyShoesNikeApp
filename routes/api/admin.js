var express = require('express');
var router = express.Router();

const AdminController = require('../../controller/AdminController')

router
    .post('/login', AdminController.login)
    .put('/change-password', AdminController.changePassword)

module.exports = router;