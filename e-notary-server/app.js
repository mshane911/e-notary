var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user/users');

const PORT = process.env.PORT || 9000
var app = express();

// Rate Limiting
var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10
});

// apply rate limiter to all requests
app.use(limiter);

// DB CONNECTION
const dbConnect = require("./db/dbConnect");
dbConnect();

// Handle CORS error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const registRouter = require('./routes/user/registration');
const loginRouter = require('./routes/user/login');
const logoutRouter = require('./routes/user/logout');

app.use('/', indexRouter);
app.use('/api/', indexRouter);
app.use('/api/register/', registRouter);
app.use('/api/login/', loginRouter);
app.use('/api/logout/', logoutRouter);
app.use('/api/users', usersRouter);

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
  // res.render('error');
  res.send({ "error": err.message })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})

module.exports = app;
