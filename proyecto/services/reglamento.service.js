'use strict'

var sql = require('mssql');
var reply = require('../../base/utils/reply');
var validador = require('../../base/utils/validador');

let getReglamento = async (request, response) => {
    try {
        let con = await sql.connect(global.config.ds_postgrado);

        let result = await con.request()
            .execute('TR_LISTAR_REGLAMENTO');
        con.close();

        let listReglamento = result[0].map((a) => {
            return {
                id: a.Id_reglamento,
                descripcion: a.Descripcion_reglamento.trim(),
                anio: a.Anio,
                vigencia: a.Vigencia,
            }
        }) || [];

        response.json(reply.ok(listReglamento));

    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let updateReglamento = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'idReglamento', true);
        msg += validador.validarParametro(args, 'cadena', 'descripcionRegla', true);
        msg += validador.validarParametro(args, 'cadena', 'anio', true);
        msg += validador.validarParametro(args, 'cadena', 'vigencia', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('ID_REGLAMENTO', sql.Int, args.idReglamento)
                .input('DESCRIPCION_REGLAMENTO', sql.VarChar, args.descripcionRegla)
                .input('ANIO', sql.VarChar, args.anio)
                .input('VIGENCIA', sql.VarChar, args.vigencia)
                .execute('SP_ACTUALIZAR_REGLAMENTO');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
};

let insertReglamento = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'idReglamento', true);
        msg += validador.validarParametro(args, 'cadena', 'descripcionRegla', true);
        msg += validador.validarParametro(args, 'cadena', 'anio', true);
        msg += validador.validarParametro(args, 'cadena', 'vigencia', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('ID_REGLAMENTO', sql.Int, args.idReglamento)
                .input('DESCRIPCION_REGLAMENTO', sql.VarChar, args.descripcionRegla)
                .input('ANIO', sql.VarChar, args.anio)
                .input('VIGENCIA', sql.VarChar, args.vigencia)
                .execute('SP_AGREGAR_REGLAMENTO');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
};

let deleteReglamento = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'idReglamento', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('ID_REGLAMENTO', sql.Int, args.idReglamento)
                .execute('SP_ELIMINAR_REGLAMENTO');
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
    getReglamento,
    updateReglamento,
    insertReglamento,
    deleteReglamento
};
