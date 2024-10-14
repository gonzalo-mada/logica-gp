'use strict'

var sql = require('mssql');
var reply = require('../../base/utils/reply');
var invoker = require('../../base/invokers/invoker.invoker');

function getCalendarioAcademico(request, response) {
    try {
        var args = JSON.parse(request.body.arg === undefined ? "{}" : request.body.arg);
        var con = new sql.Connection(global.config.ds_PSMDB, function (err) {
            var stmt = new sql.Request(con);
            stmt.input("anoPeriodo", sql.Int, args.anoPeriodo);
            stmt.input("semPeriodo", sql.Int, args.semestrePeriodo);
            if (args.hasOwnProperty("regimen")) {
                stmt.input("regimen", sql.VarChar, args.regimen);
            }
            stmt.execute("BAS_SEL_CalendarioAcademico").then(function (recordsets) {
                if (undefined != recordsets[0][0]) {
                    var reg = recordsets[0][0];
                    var dateFormat = require('dateformat');
                    var fecha = new Date();
                    var fechaInicial = "";
                    var fechaFinal = "";
                    if (null != reg["fechaIni"]) {
                        fecha = new Date(reg["fechaIni"]);
                        fecha.setDate(fecha.getDate() + 1);
                        fechaInicial = dateFormat(fecha, "yyyy-mm-dd");
                    } else {
                        fechaInicial = "";
                    }
                    if (null != reg["fechaFin"]) {
                        fecha = new Date(reg["fechaFin"]);
                        fecha.setDate(fecha.getDate() + 1);
                        fechaFinal = dateFormat(fecha, "yyyy-mm-dd");
                    } else {
                        fechaFinal = "";
                    }
                    var calendario = {
                        "fechaIni": fechaInicial,
                        "fechaFin": fechaFinal,
                        "decretoCalendario": reg["decretoCalendario"]
                    }
                    response.status(200).json(reply.ok(calendario));
                } else {
                    response.status(200).json(reply.ok({}));
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
    getCalendarioAcademico
};
