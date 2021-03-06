﻿'use strict';
var config = require('./config');
var express = require('express');
var session = require('express-session');
var path = require('path');
var fs = require('fs')
var favicon = require('serve-favicon');
var logger = require('morgan');
var rfs = require('rotating-file-stream')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var translator = require('./infrastructure/translator');
var withTransaction = require('./infrastructure/withTransaction')(config.database);
var routes = require('./infrastructure/app-start/routes');
var sendRegister = require('./infrastructure/sendRegister');
var app = express();

var logDirectory = path.join(__dirname, 'log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});

app.use(logger('combined', { stream: accessLogStream }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(sendRegister(function () {
    console.log('sendRegister');
}));

app.use(sendRegister(function () {
    console.log('sendRegister2');
}));

app.use(sendRegister(withTransaction.commitTransactction));

app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, maxAge: config.session.maxAge * 1000 }
}))

app.use(translator({
    defaultLang: 'en-GB'
    , languages: ['pl-PL', 'en-GB']
    , sourceDirectory: path.join(__dirname, 'localization')
}));

app.use(withTransaction.open);

routes(app);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
