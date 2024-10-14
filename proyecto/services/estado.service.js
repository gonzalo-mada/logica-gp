'use strict'

var sql = require('mssql');
var reply = require('../../base/utils/reply');
var validador = require('../../base/utils/validador');
var invoker = require('../../base/invokers/invoker.invoker');

function getEstados(request, response) {
    try {
        var args = JSON.parse(request.body.arg === undefined ? "{}" : request.body.arg);
        var codigoEstadoPostulacion = args.codigoEstadoPostulacion;
        var con = new sql.Connection(global.config.ds_PSMDB, function (err) {
            var stmt = new sql.Request(con);
            stmt.input("origen", sql.VarChar, args.origen);
            stmt.input("codigoEstado", sql.Int, codigoEstadoPostulacion);
            stmt.execute("BAS_SEL_AllEstados").then(function (recordsets) {
                if (recordsets[0].length != 0) {
                    var estados = [];
                    for (var i = 0; i < recordsets[0].length; i++) {
                        var reg = recordsets[0][i];
                        var estado = {
                            "codigoEstado": reg["CodigoEstado"],
                            "estado": reg["estado"].trim()
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

function getEstadosPrograma(request, response) {
    try {
        var args = JSON.parse(request.body.arg === undefined ? "{}" : request.body.arg);
        var codigoEstadoPostulacion = args.codigoEstadoPostulacion;
        var con = new sql.Connection(global.config.ds_PSMDB, function (err) {
            var stmt = new sql.Request(con);
            stmt.execute("BAS_SEL_AllEstadosPrograma").then(function (recordsets) {
                if (recordsets[0].length != 0) {
                    var estados = [];
                    for (var i = 0; i < recordsets[0].length; i++) {
                        var reg = recordsets[0][i];
                        var estado = {
                            "codigoEstado": reg["codigoEstado"],
                            "estado": reg["estado"].trim()
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

function getEstadosSira(request, response) {
    try {
        var args = JSON.parse(request.body.arg === undefined ? "{}" : request.body.arg);
        var con = new sql.Connection(global.config.ds_PSMDB, function (err) {
            var stmt = new sql.Request(con);
            stmt.input("codigoEstado", sql.Char, args.codigoEstadoAlumno);
            stmt.execute("BAS_SEL_AllEstadosSira").then(function (recordsets) {
                if (recordsets[0].length != 0) {
                    var estados = [];
                    for (var i = 0; i < recordsets[0].length; i++) {
                        var reg = recordsets[0][i];
                        var estado = {
                            "codigoEstado": reg["cod_estado"],
                            "estado": reg["estado"].trim()
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

let getEstadosMaestros = async (request, response) => {
    try {
        let con = await sql.connect(global.config.ds_postgrado);

        let result = await con.request()
            .execute('TR_LISTAR_ESTADO_MAESTRO');
        con.close();

        let listEstadosMaestros = result[0].map((a) => {
            return {
                codigo: a.Cod_EstadoMaestro,
                descripcion: a.Descripcion_EstadoMaestro.trim(),
            }
        }) || [];

        response.json(reply.ok(listEstadosMaestros));

    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let getEstadosAcreditacion= async (request, response) => {
    try {
        let con = await sql.connect(global.config.ds_postgrado);

        let result = await con.request()
            .execute('TR_LISTAR_ACREDITACIONES');
        con.close();

        let listEstadosAcreditacion = result[0].map((a) => {
            return {
                codigoAcred: a.Cod_acreditacion,
                acreditado: a.Acreditado.trim(),
                certificado: a.Certificado.trim(),
                evaluacionInt: a.Evaluacion_interna.trim(),
                fechaInforme: a.Fecha_informe,
                nombreAgAcred: a.Nombre_ag_acredit.trim(),
                nombreAgCert: a.Nombre_ag_certif.trim(),
                tiempoAcred: a.Cod_tiempoacredit,
            }
        }) || [];

        response.json(reply.ok(listEstadosAcreditacion));

    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let updateEstadoAcreditacion = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'codigoEstadoAcred', true);
        msg += validador.validarParametro(args, 'cadena', 'acreditado', true);
        msg += validador.validarParametro(args, 'cadena', 'certificado', true);
        msg += validador.validarParametro(args, 'cadena', 'evaInterna', true);
        msg += validador.validarParametro(args, 'cadena', 'fechaInforme', true);
        msg += validador.validarParametro(args, 'cadena', 'nombreAgAcred', true);
        msg += validador.validarParametro(args, 'cadena', 'nombreAgCert', true);
        msg += validador.validarParametro(args, 'numero', 'codigoTiempoAcred', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_ACREDITACION', sql.Int, args.codigoEstadoAcred)
                .input('ACREDITADO', sql.VarChar, args.acreditado)
                .input('CERTIFICADO', sql.VarChar, args.certificado)
                .input('EVA_INTERNA', sql.VarChar, args.evaInterna)
                .input('FECHA_INFORME', sql.VarChar, args.fechaInforme)
                .input('NOMBRE_AG_ACREDIT', sql.VarChar, args.nombreAgAcred)
                .input('NOMBRE_AG_CERTIF', sql.VarChar, args.nombreAgCert)
                .input('COD_TIEMPOACREDIT', sql.Int, args.codigoTiempoAcred)
                .execute('SP_ACTUALIZAR_ACREDITACION');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
};

let insertEstadoAcreditacion = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'codigoEstadoAcred', true);
        msg += validador.validarParametro(args, 'cadena', 'acreditado', true);
        msg += validador.validarParametro(args, 'cadena', 'certificado', true);
        msg += validador.validarParametro(args, 'cadena', 'evaInterna', true);
        msg += validador.validarParametro(args, 'cadena', 'fechaInforme', true);
        msg += validador.validarParametro(args, 'cadena', 'nombreAgAcred', true);
        msg += validador.validarParametro(args, 'cadena', 'nombreAgCert', true);
        msg += validador.validarParametro(args, 'numero', 'codigoTiempoAcred', true);


        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_ACREDITACION', sql.Int, args.codigoEstadoAcred)
                .input('ACREDITADO', sql.VarChar, args.acreditado)
                .input('CERTIFICADO', sql.VarChar, args.certificado)
                .input('EVA_INTERNA', sql.VarChar, args.evaInterna)
                .input('FECHA_INFORME', sql.VarChar, args.fechaInforme)
                .input('NOMBRE_AG_ACREDIT', sql.VarChar, args.nombreAgAcred)
                .input('NOMBRE_AG_CERTIF', sql.VarChar, args.nombreAgCert)
                .input('COD_TIEMPOACREDIT', sql.Int, args.codigoTiempoAcred)
                .execute('SP_AGREGAR_ACREDITACION');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
};

let deleteEstadoAcreditacion = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'codigoEstadoAcred', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_ACREDITACION', sql.Int, args.codigoEstadoAcred)
                .execute('SP_ELIMINAR_ACREDITACION');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        console.log("eeee",e);
        response.json(reply.fatal(e));
    }
};


module.exports = {
    getEstados,
    getEstadosPrograma,
    getEstadosSira,
    getEstadosMaestros,
    getEstadosAcreditacion,
    updateEstadoAcreditacion,
    insertEstadoAcreditacion,
    deleteEstadoAcreditacion
};
