'use strict'

var sql = require('mssql');
var reply = require('../../base/utils/reply');
var validador = require('../../base/utils/validador');

let getCategoriaTipoPrograma = async (request, response) => {
    try {
        let con = await sql.connect(global.config.ds_postgrado);

        let result = await con.request()
            .execute('TR_LISTAR_CATEGORIAS_TP');
        con.close();

        let listCategoriaTipoPrograma = result[0].map((a) => {
            return {
                codigo: a.Cod_CategoriaTP,
                descripcion: a.Descripcion_categoria.trim(),
            }
        }) || [];

        response.json(reply.ok(listCategoriaTipoPrograma));

    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let updateCategoriaTipoPrograma = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'codigoCategoria', true);
        msg += validador.validarParametro(args, 'cadena', 'descripcionCategoria', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_CATEGORIATP', sql.Int, args.codigoCategoria)
                .input('DESCRIPCION_CATEGORIA', sql.VarChar, args.descripcionCategoria)
                .execute('SP_ACTUALIZAR_CATEGORIA_TP');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
};

let insertCategoriaTipoPrograma = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'codigoCategoria', true);
        msg += validador.validarParametro(args, 'cadena', 'descripcionCategoria', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_CATEGORIATP', sql.Int, args.codigoCategoria)
                .input('DESCRIPCION_CATEGORIA', sql.VarChar, args.descripcionCategoria)
                .execute('SP_AGREGAR_CATEGORIAS_TP');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
};

let deleteCategoriaTipoPrograma = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'codigoCategoria', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_CATEGORIATP', sql.Int, args.codigoCategoria)
                .execute('SP_ELIMINAR_CATEGORIA_TP');
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
    getCategoriaTipoPrograma,
    updateCategoriaTipoPrograma,
    insertCategoriaTipoPrograma,
    deleteCategoriaTipoPrograma

};
