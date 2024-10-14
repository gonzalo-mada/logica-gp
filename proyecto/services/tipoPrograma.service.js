'use strict'

var sql = require('mssql');
var reply = require('../../base/utils/reply');
var validador = require('../../base/utils/validador');

let getTipoPrograma = async (request, response) => {
    try {
        let con = await sql.connect(global.config.ds_postgrado);

        let result = await con.request()
            .execute('TR_LISTAR_TIPO_PROGRAMA');
        con.close();

        let listTipoPrograma = result[0].map((a) => {
            return {
                codigo: a.Cod_tipoPrograma,
                descripcion: a.Descripcion_tp.trim(),
                codcategoria: a.Cod_CategoriaTP,
            }
        }) || [];

        response.json(reply.ok(listTipoPrograma));

    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let updateTipoPrograma = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'codigoTp', true);
        msg += validador.validarParametro(args, 'cadena', 'descripcionTp', true);
        msg += validador.validarParametro(args, 'numero', 'codigoCategoriaTp', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_TP', sql.Int, args.codigoTp)
                .input('DESCRIPCION_TP', sql.VarChar, args.descripcionTp)
                .input('COD_CATEGORIATP', sql.Int, args.codigoCategoriaTp)
                .execute('SP_ACTUALIZAR_TIPO_PROGRAMA');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
};

let insertTipoPrograma = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'codigoTp', true);
        msg += validador.validarParametro(args, 'cadena', 'descripcionTp', true);
        msg += validador.validarParametro(args, 'numero', 'codigoCategoriaTp', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_TIPOTP', sql.Int, args.codigoTp)
                .input('DESCRIPCION_TP', sql.VarChar, args.descripcionTp)
                .input('COD_CATEGORIATP', sql.Int, args.codigoCategoriaTp)
                .execute('SP_AGREGAR_TIPO_PROGRAMA');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
};

let deleteTipoPrograma = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'codigoTp', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_TP', sql.Int, args.codigoTp)
                .execute('SP_ELIMINAR_TIPO_PROGRAMA');
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
    getTipoPrograma,
    updateTipoPrograma,
    insertTipoPrograma,
    deleteTipoPrograma
};
