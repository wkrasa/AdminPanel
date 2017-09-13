'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {

    res.render('index', { title: 'Express', message: req.query.message || 'test' });
});

module.exports = router;
