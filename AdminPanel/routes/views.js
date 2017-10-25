﻿'use strict';

var express = require('express');
var router = express.Router();

router.get('/*', function (req, res) {
    res.render(req.params[0]);
});

module.exports = router;
