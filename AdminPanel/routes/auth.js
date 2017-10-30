'use strict';
var express = require('express');
var usersSrv = require('../infrastructure/services/usersSrv');
var authSrv = require('../infrastructure/services/authSrv');
var router = express.Router();

/* GET home page. */
router.post('/login', function (req, res, next) {  
    var login = req.body.login || req.body.email;
    if (login) {
        authSrv.login(req, login);
        res.send(200);
    }
    else {
        res.send(401);
    }
});

router.get('/logout', function (req, res, next) {
    authSrv.logout();
    res.send(200);
});

module.exports = router;
