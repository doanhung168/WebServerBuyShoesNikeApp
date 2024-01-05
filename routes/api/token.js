var express = require('express');
var router = express.Router();

const tokenController = require('../../controller/TokenController')
router
    .post('/', tokenController.create)
    .delete('/',tokenController.delete)
    .get("/",tokenController.getAll)
module.exports = router;