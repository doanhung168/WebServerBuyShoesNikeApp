var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/shoes-create', function(req, res, next) {
  res.render('shoes/shoes_create');
});


router.get('/shoes-list', function(req, res, next) {
  res.render('shoes/shoes_list');
});

router.get('/shoes-detail/:id', function(req, res, next) {
  const id = req.params.id
  res.render('shoes/shoes_detail', {id: id});
});


module.exports = router;
``