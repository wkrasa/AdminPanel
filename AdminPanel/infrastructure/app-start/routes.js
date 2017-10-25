'use strict';

var index = require('../../routes/index');
var users = require('../../routes/users');
var views = require('../../routes/views');

var authenticate = require('../authenticate')('/');

var init = function (app) {
    app.use('/', index);
    app.use('/users', authenticate, users);
    app.use('/view', views);
}

module.exports = init;
