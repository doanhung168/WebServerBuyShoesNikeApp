var express = require('express');
var router = express.Router();

router.get('/shoes-type-list', function (req, res, next) {
  if (req.cookies.login == null) {
    res.send('Bạn cần có quyền để tiếp cận trang này!')
    return
  }
  res.render('shoes_type/shoes_type_list');
});

module.exports = router;