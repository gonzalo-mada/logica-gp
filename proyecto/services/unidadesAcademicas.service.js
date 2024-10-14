'use strict'

var sql = require('mssql');
var reply = require('../../base/utils/reply');
var validador = require('../../base/utils/validador');

let getUnidadesAcademicas = async (request, response) => {
    try {
        let con = await sql.connect(global.config.ds_postgrado);

        let result = await con.request()
            .execute('TR_LISTAR_UNIDAD_ACADEMICA');
        con.close();

        let listUnidades = result[0].map((a) => {
            return {
                coduni: a.Cod_unidad_academica,
                codfacu: a.Cod_facultad,
                descripcion: a.Descripcion_ua.trim(),
            }
        }) || [];

        response.json(reply.ok(listUnidades));

    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let updateUnidadesAcademicas = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'codigoUnidad', true);
        msg += validador.validarParametro(args, 'numero', 'codigoFacultad', true);
        msg += validador.validarParametro(args, 'cadena', 'descripcionUnidad', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_UA', sql.Int, args.codigoUnidad)
                .input('COD_FACULTAD', sql.Int, args.codigoFacultad)
                .input('DESCRIPCION_UA', sql.VarChar, args.descripcionUnidad)
                .execute('SP_ACTUALIZAR_UNIDAD_ACADEMICA');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
};

let insertUnidadesAcademicas = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'codigoUnidad', true);
        msg += validador.validarParametro(args, 'numero', 'codigoFacultad', true);
        msg += validador.validarParametro(args, 'cadena', 'descripcionUnidad', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_UA', sql.Int, args.codigoUnidad)
                .input('COD_FACULTAD', sql.Int, args.codigoFacultad)
                .input('DESCRIPCION_UA', sql.VarChar, args.descripcionUnidad)
                .execute('SP_AGREGAR_UNIDAD_ACADEMICA');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
};

let deleteUnidadesAcademicas = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'codigoUnidad', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_UA', sql.Int, args.codigoUnidad)
                .execute('SP_ELIMINAR_UNIDAD_ACADEMICA');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
};

module.exports = {
    getUnidadesAcademicas,
    updateUnidadesAcademicas,
    insertUnidadesAcademicas,
    deleteUnidadesAcademicas
};
