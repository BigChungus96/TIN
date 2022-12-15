var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

const fmt=require('./public/js/utils/dateFormatting');
app.use((req,res,next)=>{
    res.locals.fmt=fmt;
    next();
});

const customerRouter=require('./routes/customerRoute');
const carRouter=require('./routes/carRoute');
const orderRouter=require('./routes/orderRoute');

const customerApiRouter=require('./routes/api/CustomerApiRoute');
const carApiRouter=require('./routes/api/CarApiRoute');
const orderApiRouter=require('./routes/api/OrderApiRoute');

const sequelizeInit=require('./config/sequelize/init');
sequelizeInit()
    .catch(err=>{
        console.log(err);
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customer',customerRouter);
app.use('/car',carRouter);
app.use('/order',orderRouter);

app.use('/api/customer',customerApiRouter);
app.use('/api/car',carApiRouter);
app.use('/api/order',orderApiRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
