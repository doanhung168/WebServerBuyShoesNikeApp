var express = require('express');
var router = express.Router();

router.get('/report', function (req, res, next) {
    if (req.cookies.login == null) {
        res.send('Bạn cần có quyền để tiếp cận trang này!')
        return
    }
    res.render('report/home');
});

router.get('/report/revenue', function (req, res, next) {
    if (req.cookies.login == null) {
        res.send('Bạn cần có quyền để tiếp cận trang này!')
        return
    }
    res.render('report/revenue');
})

router.get('/report/user', function (req, res, next) {
    if (req.cookies.login == null) {
        res.send('Bạn cần có quyền để tiếp cận trang này!')
        return
    }
    res.render('report/user');
})

router.get('/report/shoes', function (req, res, next) {
    if (req.cookies.login == null) {
        res.send('Bạn cần có quyền để tiếp cận trang này!')
        return
    }
    res.render('report/shoes');
})
router.get('/_user-detail/:id', function (req, res, next) {
    if (req.cookies.login == null) {
      res.send('Bạn cần có quyền để tiếp cận trang này!')
      return
    }
    res.render('report/user_detail', { id: req.params.id });
  })
module.exports = router;