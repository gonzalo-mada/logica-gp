'use strict'

var sql = require('mssql');
var reply = require('../../base/utils/reply');
var validador = require('../../base/utils/validador');

let getSupension = async (request, response) => {
    try {
        let con = await sql.connect(global.config.ds_postgrado);

        let result = await con.request()
            .execute('TR_LISTAR_SUSPENSION');
        con.close();

        let listReglamento = result[0].map((a) => {
            return {
                id: a.ID_TipoSuspension,
                descripcion: a.Descripcion_TipoSuspension.trim(),
                codigoEstM: a.Cod_EstadoMaestro,
            }
        }) || [];

        response.json(reply.ok(listReglamento));

    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let updateSuspension = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'idTipoSusp', true);
        msg += validador.validarParametro(args, 'cadena', 'descripcionSusp', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('ID_TIPOSUSPENSION', sql.Int, args.idTipoSusp)
                .input('DESCRIPCION_SUSPENSION', sql.VarChar, args.descripcionSusp)
                .execute('SP_ACTUALIZAR_SUSPENSION');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
};

let insertSuspension = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'idTipoSusp', true);
        msg += validador.validarParametro(args, 'cadena', 'descripcionSusp', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('ID_TIPOSUSPENSION', sql.Int, args.idTipoSusp)
                .input('DESCRIPCION_SUSPENSION', sql.VarChar, args.descripcionSusp)
                .execute('SP_AGREGAR_SUSPENSION');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
};

let deleteSupension = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'idTipoSusp', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('ID_TIPOSUSPENSION', sql.Int, args.idTipoSusp)
                .execute('SP_ELIMINAR_SUSPENSION');
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
    getSupension,
    updateSuspension,
    insertSuspension,
    deleteSupension
};
