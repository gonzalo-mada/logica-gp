'use strict'

var sql = require('mssql');
var reply = require('../../base/utils/reply');
var validador = require('../../base/utils/validador');

let getModalidades = async (request, response) => {
    try {
        let con = await sql.connect(global.config.ds_postgrado);

        let result = await con.request()
            .execute('TR_LISTAR_MODALIDAD');
        con.close();

        let listReglamento = result[0].map((a) => {
            return {
                Cod_modalidad: a.Cod_Modalidad,
                Descripcion_modalidad: a.Descripcion_modalidad.trim()
            }
        }) || [];

        response.json(reply.ok(listReglamento));

    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let insertModalidad = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'Cod_modalidad', true);
        msg += validador.validarParametro(args, 'cadena', 'Descripcion_modalidad', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_MODALIDAD', sql.Int, args.Cod_modalidad)
                .input('DESCRIPCION_MODALIDAD', sql.VarChar, args.Descripcion_modalidad)
                .execute('SP_AGREGAR_MODALIDAD');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let updateModalidad = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'Cod_modalidad', true);
        msg += validador.validarParametro(args, 'cadena', 'Descripcion_modalidad', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_MODALIDAD', sql.Int, args.Cod_modalidad)
                .input('DESCRIPCION_MODALIDAD', sql.VarChar, args.Descripcion_modalidad)
                .execute('SP_ACTUALIZAR_MODALIDAD');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let deleteModalidad = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'Cod_modalidad', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_MODALIDAD', sql.Int, args.Cod_modalidad)
                .execute('SP_ELIMINAR_MODALIDAD');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
}


module.exports = {
    getModalidades,
    insertModalidad,
    updateModalidad,
    deleteModalidad
};