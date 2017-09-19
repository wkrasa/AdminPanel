'use strict';

var sql = require('mssql');
var config = require('../../config');

var srv = {
    getUsers: function (req, res, next) {
        sql.connect(config.database, function (err) {

            if (err) {
                next(err);
                return;
            }
            var request = new sql.Request();
            request.query('select * from Users', function (err, data) {

                if (err) {
                    console.log(err);
                }
                else {
                    next(data.recordset);
                }

            });
        });
    }
};

module.exports  = srv;