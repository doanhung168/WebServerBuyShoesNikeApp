var express = require('express');
var router = express.Router();

router.get('/offer-list', function(req, res) {
  res.render('offer/offer_list')
})

router.get('/offer-create', function(req, res) {
  res.render('offer/offer_create');
});

router.get('/offer-detail/:id', function(req, res) {
  const id = req.params.id
  res.render('offer/offer_detail', {id: id});
});

module.exports = router;