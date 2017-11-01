'use strict';
//todo: use transaction and connection pool
var sql = require('mssql');

var globalConnection = null;
var exports = function (connection) {
    var withTransaction = {};

    withTransaction.open = function (req, res, next) {
        //res.on('finish', function () {
        //    var connection = req.connection;
        //    if (connection) {
        //       // connection.close();
        //    };
        //});
        if (globalConnection) {
            req.connection = globalConnection;
            withTransaction.strartTransactction(req, res, next);
        }
        else {
            sql.connect(connection, function (err) {
                if (err) {
                    sql.close();
                    next(err);
                    return;
                }
                globalConnection = sql;
                req.connection = globalConnection;
                withTransaction.strartTransactction(req, res, next);
            });
        }
    };

    withTransaction.strartTransactction = function (req, res, next) {
        console.log('transaction started');
        next();
    };

    withTransaction.commitTransactction = function (req, res) {
        console.log('transaction commited');
    };

    return withTransaction;
}

module.exports = exports;





