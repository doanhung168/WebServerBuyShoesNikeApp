require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
const mongoose = require('mongoose')

const _homeRouter = require('./routes/view/_home')
const _shoesRouter = require('./routes/view/_shoes')
const _shoesTypeRouter = require('./routes/view/_shoes_type')
const _offerRouter = require('./routes/view/_offer')

const usersRouter = require('./routes/api/user')
const shoesRouter = require('./routes/api/shoes')
const shoesTypeRouter = require('./routes/api/shoes_type')
const imageRouter = require('./routes/api/image')
const offerRouter = require('./routes/api/offer')
const addressRouter = require('./routes/api/address')
const orderDetailRouter = require('./routes/api/order_detail')
const orderRouter = require('./routes/api/order')



// connect database
mongoose.connect('mongodb+srv://hung:hung@cluster0.isn42.mongodb.net/shoes', {
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('connect database successfully'))
  .catch(err => console.log(err.reason));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 1000000 }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', _homeRouter)
app.use('/', _shoesRouter)
app.use('/', _shoesTypeRouter)
app.use('/', _offerRouter)

app.use('/user', usersRouter)
app.use('/shoes', shoesRouter)
app.use('/shoes-type', shoesTypeRouter)
app.use('/shoes_image', imageRouter)
app.use('/offer', offerRouter)
app.use('/address', addressRouter)
app.use('/order-detail', orderDetailRouter)
app.use('/order', orderRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
