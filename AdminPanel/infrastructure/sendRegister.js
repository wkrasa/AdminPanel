'use strict';

function sendRegister(toRegister) {
    return function (req, res, next) {
        var _send = res.send;
        res.send = function (body) {
            toRegister(req, res);
            return _send.call(res, body);
        }
        next();
    }
}

module.exports = sendRegister;