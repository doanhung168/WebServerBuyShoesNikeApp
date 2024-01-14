var express = require('express');
var router = express.Router();

router.get('/order-list', function (req, res, next) {
  if (req.cookies.login == null) {
    res.send('Bạn cần có quyền để tiếp cận trang này!')
    return
  }
  res.render('order/order_list');
});

router.get('/_order-detail/:id', function (req, res, next) {
  if (req.cookies.login == null) {
    res.send('Bạn cần có quyền để tiếp cận trang này!')
    return
  }
  res.render('order/order_detail', { id: req.params.id });
})

module.exports = router;