var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/shoes-type-create', function(req, res, next) {
  res.render('shoes_type/shoes_type_create');
});

module.exports = router;