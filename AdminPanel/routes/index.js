'use strict';
var express = require('express');
var usersSrv = require('../infrastructure/services/usersSrv');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    usersSrv.getUsers(req, res, (data) => {
        res.locals.users = data;
        req.session.views = req.session.views ? req.session.views + 1 : 1;
        res.render('index', { title: 'Express', message: req.query.message || 'test', views: req.session.views });
    });    
});

module.exports = router;
