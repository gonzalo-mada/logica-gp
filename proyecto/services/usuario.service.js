'use strict'

var sql = require('mssql');
var reply = require('../../base/utils/reply');

var invoker = require('../../base/invokers/invoker.invoker');

function getPersonalUa(request, response) {
    try {
        var args = JSON.parse(request.body.arg === undefined ? "{}" : request.body.arg);
        var con = new sql.Connection(global.config.ds_PSMDB, function (err) {
            var stmt = new sql.Request(con);
            stmt.input("codigoUnidadAcademica", sql.Int, args.codigoFacultad);
            stmt.execute("BAS_SEL_ListaUsuarios").then(function (recordsets) {
                if (recordsets[0].length != 0) {
                    var usuarios = [];
                    for (var i = 0; i < recordsets[0].length; i++) {
                        var reg = recordsets[0][i];
                        var usuario = {
                            "codigoPersonalUA": reg["codigoPersonalUA"],
                            "codigoUnidadAcademica": reg["codigoUnidadAcademica"],
                            "nombre": reg["nombre"],
                            "apellidoP": reg["apellidoP"],
                            "apellidoM": reg["apellidoM"],
                            "nombreUsuario": reg["nombreUsuario"],
                            "contrasena": reg["contrasena"],
                            "email": reg["email"],
                            "nombreCompleto": reg["nombreCompleto"]
                        }
                        usuarios.push(usuario);
                    }
                    response.status(200).json(reply.ok(usuarios));
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

function getUsuariosProgramas(request, response) {
    try {
        var args = JSON.parse(request.body.arg === undefined ? "{}" : request.body.arg);
        var con = new sql.Connection(global.config.ds_PSMDB, function (err) {
            var stmt = new sql.Request(con);
            stmt.input("codigoFacultad", sql.Int, args.codigoFacultad);
            stmt.input("codigoPersonalUA", sql.BigInt, args.codigoPersonalUA);
            stmt.execute("BAS_SEL_UsuariosProgramas").then(function (recordsets) {
                if (recordsets[0].length != 0) {
                    var programas = [];
                    for (var i = 0; i < recordsets[0].length; i++) {
                        var reg = recordsets[0][i];
                        var programa = {
                            "numeroDecreto": reg["numeroDecreto"],
                            "codigoPrograma": reg["codigoPrograma"],
                            "facultad": reg["facultad"],
                            "nombrePrograma": reg["nombrePrograma"],
                            "nombreEstado": reg["nombreEstado"]
                        }
                        programas.push(programa);
                    }
                    response.status(200).json(reply.ok(programas));
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
    getPersonalUa,
    getUsuariosProgramas
};
