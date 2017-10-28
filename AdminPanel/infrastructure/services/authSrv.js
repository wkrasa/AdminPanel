'use strict';

//should add/check auth cookie
//simpler solution: use session
//- method for app.use, which sets user in current req
//- method fr login, which set user in session
var authenticate = function () {
    var self = this;
    self.login = function () {
    };

    self.logout = function () {
    };

    self.sessionLogin(req, res, next){
        next();

    }
}

module.exports = authenticate;





