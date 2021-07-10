var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');


const myEnv = dotenv.config()
if (myEnv.error) {
    throw myEnv.error
}

var indexRouter = require('./routes/routes');


var app = express();
app.use(express.static(path.join(__dirname, '../..', 'build')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);




module.exports = app;
