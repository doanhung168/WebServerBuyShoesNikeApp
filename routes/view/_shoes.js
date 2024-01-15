var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/shoes-create', function (req, res, next) {
  if (req.cookies.login == null) {
    res.send('Bạn cần có quyền để tiếp cận trang này!')
    return
  }
  res.render('shoes/shoes_create');
});


router.get('/shoes-list', function (req, res, next) {
  console.log(req.cookies.login)
  if (req.cookies.login == null) {
    return res.send('Bạn cần có quyền để tiếp cận trang này!')
  }
  res.render('shoes/shoes_list');
});

router.get('/shoes-detail/:id', function (req, res, next) {
  if (req.cookies.login == null) {
    res.send('Bạn cần có quyền để tiếp cận trang này!')
    return
  }
  const id = req.params.id
  res.render('shoes/shoes_detail', { id: id });
});


module.exports = router;
``