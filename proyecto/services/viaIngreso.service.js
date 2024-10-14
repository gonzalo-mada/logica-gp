'use strict'

var sql = require('mssql');
var reply = require('../../base/utils/reply');

var invoker = require('../../base/invokers/invoker.invoker');

function getViasIngreso(request, response) {
    try {
        var args = JSON.parse(request.body.arg === undefined ? "{}" : request.body.arg);
        var con = new sql.Connection(global.config.ds_PSMDB, function (err) {
            var stmt = new sql.Request(con);
            stmt.execute("BAS_SEL_ViasIngresoSira").then(function (recordsets) {
                if (recordsets[0].length != 0) {
                    var estados = [];
                    for (var i = 0; i < recordsets[0].length; i++) {
                        var reg = recordsets[0][i];
                        var estado = {
                            "codigoEstado": reg["cod_estado"],
                            "descripcion": reg["descripcion"].trim()
                        }
                        estados.push(estado);
                    }
                    response.status(200).json(reply.ok(estados));
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
    getViasIngreso
};