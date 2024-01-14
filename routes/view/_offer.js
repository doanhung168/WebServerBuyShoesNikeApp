var express = require('express');
var router = express.Router();

router.get('/offer-list', function (req, res) {
  console.log(req.cookies.login)
  if (req.cookies.login == null) {
    res.send('Bạn cần có quyền để tiếp cận trang này!')
    return
  }
  res.render('offer/offer_list')
})

router.get('/offer-create', function (req, res) {
  if (req.cookies.login == null) {
    res.send('Bạn cần có quyền để tiếp cận trang này!')
    return
  }
  res.render('offer/offer_create');
});

router.get('/offer-detail/:id', function (req, res) {
  if (req.cookies.login == null) {
    res.send('Bạn cần có quyền để tiếp cận trang này!')
    return
  }
  const id = req.params.id
  res.render('offer/offer_detail', { id: id });
});

module.exports = router;