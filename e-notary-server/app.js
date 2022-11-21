var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload');
const socket = require('socket.io')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user/users');

const PORT = process.env.PORT || 9000
var app = express();

// For Chat app
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

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
app.use(fileUpload());

// serve static files from dir pdf
app.use('/pdf', express.static('pdf'));

// ROUTES
const registRouter = require('./routes/user/registration');
const loginRouter = require('./routes/user/login');
const logoutRouter = require('./routes/user/logout');
const updateRouter = require('./routes/user/updateUser');
const getUserRouter = require('./routes/user/getUser');

const createUsignTokenRouter = require('./routes/usign/createToken');
const authUsignTokenRouter = require('./routes/usign/authToken');
const signDocumentRouter = require('./routes/usign/signDocument');
const storePdfRouter = require('./routes/usign/storePdf');


const createBotRouter = require('./routes/langcode/createBot');
const deleteBotRouter = require('./routes/langcode/deleteBot');
const getBotsRouter = require('./routes/langcode/getBots');
const uploadFileToBotRouter = require('./routes/langcode/uploadFileToBot');
const getDocumentsInBotRouter = require('./routes/langcode/getDocumentsInBot');
const deleteDocumentRouter = require('./routes/langcode/deleteDocument');
const sendMessageToBotRouter = require('./routes/langcode/sendMessageToBot');
const getMessagesInSessionRouter = require('./routes/langcode/getMessagesInSession');
const clearMessagesInSessionRouter = require('./routes/langcode/clearMessagesInSession');

app.use('/', indexRouter);
app.use('/api/', indexRouter);
app.use('/api/register/', registRouter);
app.use('/api/login/', loginRouter);
app.use('/api/logout/', logoutRouter);
app.use('/api/update/', updateRouter);
app.use('/api/getUser/', getUserRouter);
app.use('/api/users', usersRouter);

app.use('/api/usign/createUsignToken', createUsignTokenRouter);
app.use('/api/usign/authUsignToken', authUsignTokenRouter);
app.use('/api/usign/signDocument', signDocumentRouter);
app.use('/api/usign/storePdf', storePdfRouter);

app.use('/api/langcode/createBot', createBotRouter);
app.use('/api/langcode/deleteBot', deleteBotRouter);
app.use('/api/langcode/getBots', getBotsRouter);
app.use('/api/langcode/uploadFileToBot', uploadFileToBotRouter);
app.use('/api/langcode/getDocumentsInBot', getDocumentsInBotRouter);
app.use('/api/langcode/deleteDocument', deleteDocumentRouter);
app.use('/api/langcode/sendMessageToBot', sendMessageToBotRouter);
app.use('/api/langcode/getMessagesInSession', getMessagesInSessionRouter);
app.use('/api/langcode/clearMessagesInSession', clearMessagesInSessionRouter);

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

const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})

const io = socket(server, { allowEIO3: true, maxHttpBufferSize: 1e8, cors: { origin: "http://localhost:3000" } });
require('./utils/socket')(io);

module.exports = app;