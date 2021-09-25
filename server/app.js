var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const noCache = require('nocache');
const compression = require('compression');
var logger = require('morgan');
var cors = require('cors');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var indexRouter = require('./routes/index');
var insertRouter = require('./routes/insert');
var commonRouter = require('./routes/common');
var loginRouter = require('./routes/login');

var app = express();
//#region helmet
app.use(helmet.xssFilter());
app.use(noCache());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard());
//#endregion helmet

app.use(compression());
app.use(bodyParser.json({limit: '100mb'}));
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressSession({ secret: 'max', saveUninitialized: false, resave: false }));
app.use(cookieParser());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(cors());
app.use('/index', indexRouter);
app.use('/insert', insertRouter);
app.use('/common', commonRouter);
app.use('/login', loginRouter);

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
