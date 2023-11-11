var express = require('express');
var router = express.Router();

router.get('/shoes-type-list', function(req, res, next) {
  res.render('shoes_type/shoes_type_list');
});

module.exports = router;