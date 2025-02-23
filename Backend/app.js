var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
// var indexRouter = require('./routes/index');
// const studentRouter = require('./routes/studentRoutes');
// const adminRouter = require('./routes/adminRoutes');
const appointmentRouter = require('./routes/appointmentRoutes');
const userRouter = require('./routes/userRoutes');

var app = express();


const mongoose = require('mongoose');

// DB Connection
mongoose.set('strictQuery', false);
const db = 'mongodb+srv://Admin:eTcWPRNaEPZVk2Qh@cluster0.2j5br.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(db)
  console.log('database connected')
}

// NLizTY7aQH7cJjO0

// mongodb+srv://reactblog:NLizTY7aQH7cJjO0@cluster0.7na1v62.mongodb.net/Student_Attendance?retryWrites=true&w=majority

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// Use CORS middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/student', studentRouter);
// app.use('/admin', adminRouter);
app.use('/appointment', appointmentRouter);
app.use('/user', userRouter);

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
