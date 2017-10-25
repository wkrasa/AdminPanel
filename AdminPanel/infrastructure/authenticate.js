'use strict';

var authenticate = function (redirectUrl) {
    return function (req, res, next) {
        if (req.user) {
            return next();
        }
        else {
            if (req.xhr) {
                res.send(401);
            }
            else {
                res.redirect(redirectUrl);
            }
        }
    }
}

module.exports = authenticate;





