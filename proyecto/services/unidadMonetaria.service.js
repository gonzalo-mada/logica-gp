'use strict'

var sql = require('mssql');
var reply = require('../../base/utils/reply');
var invoker = require('../../base/invokers/invoker.invoker');

function getUnidadMonetaria(request, response) {
    try {
        var args = JSON.parse(request.body.arg === undefined ? "{}" : request.body.arg);
        var con = new sql.Connection(global.config.ds_PSMDB, function (err) {
            var stmt = new sql.Request(con);
            stmt.execute("BAS_SEL_UnidadMonetaria").then(function (recordsets) {
                if (recordsets[0].length != 0) {
                    var unidades = [];
                    for (var i = 0; i < recordsets[0].length; i++) {
                        var reg = recordsets[0][i];
                        var unidad = {
                            "codigoUnidad": reg["codigoUnidad"],
                            "unidad": reg["unidad"].trim()
                        }
                        unidades.push(unidad);
                    }
                    response.json(reply.ok(unidades));
                } else {
                    response.json(reply.ok(null));
                }
            }).catch(function (err) {
                response.json(reply.fatal(err.message));
            });
        });

        con.on('error', function (err) {
            response.json(reply.fatal(err.message));
        });
    } catch (e) {
        response.json(reply.fatal(e.message));
    }
}

module.exports = {
    getUnidadMonetaria
};
