var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sslRedirect = require('heroku-ssl-redirect')
//
const dotenv = require('dotenv')
dotenv.config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const testAPIRouter = require('./routes/testAPI')
const authRouter = require('./routes/auth');
const authTokenRouter = require('./routes/auth-token');

var app = express();
//
var session = require('express-session');
var {redisStore} = require('./routes/auth-redis');

app.use(session({
  secret: process.env.TOKEN_SECRET,
  store: redisStore,
  saveUninitialized: false,
  resave: false,
  cookie: {
    path: '/', // Default configuration
    httpOnly: true, // Default configuration
    maxAge: 60 * 60 * 1000, // The default configuration is 60 minutes
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(sslRedirect())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/testAPI', testAPIRouter)
app.use('/auth', authRouter);
app.use('/users', authTokenRouter, usersRouter);

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
