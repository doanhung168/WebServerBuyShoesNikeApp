var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/shoes-create', function(req, res, next) {
  res.render('shoes/shoes_create');
});

module.exports = router;
