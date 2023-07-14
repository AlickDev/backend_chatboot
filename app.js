const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser'); // For send data from client to server
require('dotenv').config(); // Import Dotenv for save global variable
const { readdirSync } = require('fs'); // Read Directory
// hide headers from
const helmet = require('helmet')
const redisClient = require('redis').createClient();



//import midleware
const errorhandle = require('./middleware/errorHandler');
const app = express();
app.use(helmet());
// for all access
app.use(cors())

const limiter = require('express-limiter')(app, redisClient);
// Limit requests to 100 per hour per ip address.
limiter({
  lookup: ['connection.remoteAddress'],
  total: 100,
  expire: 1000 * 60
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({limit:'50'}));
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' })); //Set limit send file to server
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//allow access can get public file
app.use('/uploads', express.static(path.resolve(__dirname + '/uploads')));


//========== Route loop ============
// http://localhost:3000/api

readdirSync('./routes').map((file)=>{
  // console.log(file);
  app.use('/api', require('./routes/' + file));
})








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
