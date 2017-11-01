'use strict';

var sql = require('mssql');
var config = require('../../config');

var srv = {
    getUsers: function (req, res, next) {
        var request = new sql.Request();
        request.query('select * from Users', function (err, data) {
            //sql.close();
            if (err) {
                console.log(err);
            }
            else {
                next(data.recordset);
            }

        });
    }
};

module.exports  = srv;