'use strict';

//should add/check auth cookie
//simpler solution: use session
//- method for app.use, which sets user in current req
//- method fr login, which set user in session
var authenticateSrv = {
    login: function (req, userName) {
        req.session.user = { name: userName };
        //create cookie here
    },

    logout: function () {
        delete req.session.user;
    },

    sessionLogin: function (req, res, next) {
        //if session has cookie, login user
        next();
    }
}

module.exports = authenticateSrv;





