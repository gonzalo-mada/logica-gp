'use strict'

var sql = require('mssql');
var reply = require('../../base/utils/reply');
var invoker = require('../../base/invokers/invoker.invoker');

function getFechaInicioPostulacion(request, response) {
    try {
        var args = JSON.parse(request.body.arg === undefined ? "{}" : request.body.arg);
        var codigoPostulante = 0;
        if (args.hasOwnProperty("fechaIniPostulacion")) {
            var con = new sql.Connection(global.config.ds_PSMDB, function (err) {
                var stmt = new sql.Request(con);
                stmt.input("codigoProgramaPsm", sql.BigInt, args.codigoProgramaPsm);
                stmt.input("fechaIniPostulacion", sql.Date, args.fechaIniPostulacion);
                stmt.execute("BAS_SEL_FechaInicioPostulacion").then(function (recordsets) {
                    if (recordsets[0].length != 0) {
                        response.status(200).json(reply.ok(recordsets[0][0]));
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
        } else {
            response.status(200).json(reply.error("Faltan los parámetros"));
        }
    } catch (e) {
        response.status(200).json(reply.fatal(e.message));
    }
}

module.exports = {
    getFechaInicioPostulacion
};
