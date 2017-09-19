'use strict';
var express = require('express');
var usersSrv = require('../infrastructure/services/usersSrv');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    usersSrv.getUsers(req, res, (data) => {
        res.locals.users = data;
        res.render('index', { title: 'Express', message: req.query.message || 'test' });
    });    
});

module.exports = router;
