var express = require('express');
var router = express.Router();

router.get('/report', function (req, res, next) {
    res.render('report/home');
});

router.get('/report/revenue', function (req, res, next) {
    res.render('report/revenue');
})

router.get('/report/user', function (req, res, next) {
    res.render('report/user');
})

router.get('/report/shoes', function (req, res, next) {
    res.render('report/shoes');
})

module.exports = router;