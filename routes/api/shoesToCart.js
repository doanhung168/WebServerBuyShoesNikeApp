var express = require('express');
var router = express.Router();

const ShoesToCartController = require('../../controller/ShoesToCartController')
router
  .get('/:idU',ShoesToCartController.get)
  .post('/', ShoesToCartController.create)
  .delete('/:id',ShoesToCartController.delete)
  .put('/:id',ShoesToCartController.update)
module.exports = router;