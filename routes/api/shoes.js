var express = require('express');
var router = express.Router();

const ShoesController = require('../../controller/ShoesController')

router
  .get('/shoes-by-name', ShoesController.getShoesByName)

router
  .post('/', ShoesController.create)
  .get('/', ShoesController.get)
  .put('/', ShoesController.update)

router
  .get('/:id', ShoesController.getShoesById)




module.exports = router;