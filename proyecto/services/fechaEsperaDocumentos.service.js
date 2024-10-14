'use strict'

var sql = require('mssql');
var reply = require('../../base/utils/reply');
var invoker = require('../../base/invokers/invoker.invoker');

function getFechaEsperaDocumentos(request, response) {
    var dateFormat = require('dateformat');
    try {
        var args = JSON.parse(request.body.arg === undefined ? "{}" : request.body.arg);
            var con = new sql.Connection(global.config.ds_PSMDB, function (err) {
                var stmt = new sql.Request(con);
                stmt.execute("BAS_SEL_FechaLimiteEntregaDocumentos").then(function (recordsets) {
                    if (recordsets[0].length != 0) {
                        var fecha = new Date();
                        var fechaFinal = "";
                        if (null != recordsets[0][0].limite) {
                            fecha = new Date(recordsets[0][0].limite);
                            fecha.setDate(fecha.getDate() + 1);
                            fechaFinal = dateFormat(fecha, "yyyy-mm-dd");
                        } else {
                            fechaFinal = "";
                        }
                        response.status(200).json(reply.ok(fechaFinal));
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
    getFechaEsperaDocumentos
};
