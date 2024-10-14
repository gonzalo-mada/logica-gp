'use strict'

var sql = require('mssql');
var reply = require('../../base/utils/reply');
var validador = require('../../base/utils/validador');

let getTiempoAcreditacion = async (request, response) => {
    try {
        let con = await sql.connect(global.config.ds_postgrado);

        let result = await con.request()
            .execute('TR_LISTAR_TIEMPOACREDIT');
        con.close();

        let listTiempoAcreditacion = result[0].map((a) => {
            return {
                codigo: a.Cod_tiempoacredit,
                fechaInicio: a.Fecha_inicio,
                fechaTermino: a.Fecha_termino,
                cantAnios: a.Cantidad_anios,
            }
        }) || [];

        response.json(reply.ok(listTiempoAcreditacion));

    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let updateTiempoAcreditacion = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'codigoTiempoAcred', true);
        msg += validador.validarParametro(args, 'cadena', 'fechaInicio', true);
        msg += validador.validarParametro(args, 'cadena', 'fechaTermino', true);
        msg += validador.validarParametro(args, 'numero', 'cantidad', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_TIEMPOACREDIT', sql.Int, args.codigoTiempoAcred)
                .input('FECHA_INICIO', sql.VarChar, args.fechaInicio)
                .input('FECHA_TERMINO', sql.VarChar, args.fechaTermino)
                .input('CANTIDAD_ANIOS', sql.Int, args.cantidad)
                .execute('SP_ACTUALIZAR_TIEMPOACREDIT');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
};

let insertTiempoAcreditacion = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'codigoTiempoAcred', true);
        msg += validador.validarParametro(args, 'cadena', 'fechaInicio', true);
        msg += validador.validarParametro(args, 'cadena', 'fechaTermino', true);
        msg += validador.validarParametro(args, 'numero', 'cantidad', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_TIEMPOACREDIT', sql.Int, args.codigoTiempoAcred)
                .input('FECHA_INICIO', sql.VarChar, args.fechaInicio)
                .input('FECHA_TERMINO', sql.VarChar, args.fechaTermino)
                .input('CANTIDAD_ANIOS', sql.Int, args.cantidad)
                .execute('SP_AGREGAR_TIEMPOACREDIT');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
};

let deleteTiempoAcreditacion = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'codigoTiempoAcred', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_TIEMPOACREDIT', sql.Int, args.codigoTiempoAcred)
                .execute('SP_ELIMINAR_TIEMPOACREDIT');
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
    getTiempoAcreditacion,
    updateTiempoAcreditacion,
    insertTiempoAcreditacion,
    deleteTiempoAcreditacion
};
