var express = require('express');
var router = express.Router();

router.get('/order-list', function(req, res, next) {
  res.render('order/order_list');
});

router.get('/_order-detail/:id', function(req, res, next) {
  res.render('order/order_detail', {id: req.params.id});
})

module.exports = router;