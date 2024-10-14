'use strict'

var sql = require('mssql');
var reply = require('../../base/utils/reply');

var invoker = require('../../base/invokers/invoker.invoker');

function getValorUf(request, response) {
    try {
        var args = JSON.parse(request.body.arg === undefined ? "{}" : request.body.arg);
        var con = new sql.Connection(global.config.ds_PSMDB, function (err) {
            var stmt = new sql.Request(con);
            stmt.input("ano", sql.Int, args.ano);
            stmt.input("mes", sql.Int, args.mes);
            stmt.execute("BAS_SEL_IndicadorUf").then(function (result) {
                if (result[0].length != 0) {
                    response.json(reply.ok(result[0][0]));
                } else {
                    response.status(200).json(reply.ok(null));
                }
            }).catch(function (err) {
                response.status(200).json(reply.fatal(err.message));
            });
        });

        con.on('error', function (err) {
            response.status(200).json(reply.fatal(err.message));
        });
    } catch (e) {
        response.status(200).json(reply.fatal(e.message));
    }
}

function getValorDolar(request, response) {
    try {
        var args = JSON.parse(request.body.arg === undefined ? "{}" : request.body.arg);
        var con = new sql.Connection(global.config.ds_PSMDB, function (err) {
            var stmt = new sql.Request(con);
            stmt.input("ano", sql.Int, args.ano);
            stmt.input("mes", sql.Int, args.mes);
            stmt.input("semana", sql.Int, args.semana);
            stmt.execute("BAS_SEL_IndicadorDolar").then(function (result) {
                if (result[0].length != 0) {
                    response.json(reply.ok(result[0][0]));
                } else {
                    response.status(200).json(reply.ok(null));
                }
            }).catch(function (err) {
                response.status(200).json(reply.fatal(err.message));
            });
        });

        con.on('error', function (err) {
            response.status(200).json(reply.fatal(err.message));
        });
    } catch (e) {
        response.status(200).json(reply.fatal(e.message));
    }
}

module.exports = {
    getValorUf,
    getValorDolar
};
