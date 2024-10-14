'use strict'

var sql = require('mssql');
var reply = require('../../base/utils/reply');
var validador = require('../../base/utils/validador');

let getJornadas = async (request, response) => {
    try {
        let con = await sql.connect(global.config.ds_postgrado);

        let result = await con.request()
            .execute('TR_LISTAR_JORNADA');
        con.close();

        let listJornadas = result[0].map((a) => {
            return {
                Cod_jornada: a.Cod_Jornada,
                Descripcion_jornada: a.Descripcion_jornada.trim()
            }
        }) || [];

        response.json(reply.ok(listJornadas));

    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let insertJornada = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'cadena', 'Cod_jornada', true);
        msg += validador.validarParametro(args, 'cadena', 'Descripcion_jornada', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_JORNADA', sql.VarChar, args.Cod_jornada)
                .input('DESCRIPCION_JORNADA', sql.VarChar, args.Descripcion_jornada)
                .execute('SP_AGREGAR_JORNADA');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let updateJornada = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'cadena', 'Cod_jornada', true);
        msg += validador.validarParametro(args, 'cadena', 'Descripcion_jornada', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_JORNADA', sql.VarChar, args.Cod_jornada)
                .input('DESCRIPCION_JORNADA', sql.VarChar, args.Descripcion_jornada)
                .execute('SP_ACTUALIZAR_JORNADA');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let deleteJornada = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'cadena', 'Cod_jornada', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_JORNADA', sql.VarChar, args.Cod_jornada)
                .execute('SP_ELIMINAR_JORNADA');
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
    getJornadas,
    insertJornada,
    updateJornada,
    deleteJornada
};