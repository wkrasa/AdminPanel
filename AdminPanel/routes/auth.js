'use strict';
var express = require('express');
var usersSrv = require('../infrastructure/services/usersSrv');
var authSrv = require('../infrastructure/services/authSrv');
var router = express.Router();

/* GET home page. */
router.post('/login', function (req, res) {  
    var login = req.body.login || req.body.email;
    if (login) {
        authSrv.login(req, login);
        res.sendStatus(200);
    }
    else {
        res.sendStatus(401);
    }
});

router.get('/logout', function (req, res) {
    authSrv.logout();
    res.sendStatus(203);
});

module.exports = router;
