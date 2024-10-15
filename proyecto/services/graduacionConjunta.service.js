'use strict'

var sql = require('mssql');
var reply = require('../../base/utils/reply');
var validador = require('../../base/utils/validador');

let getGraduacionConjunta = async (request, response) => {
    try {
        let con = await sql.connect(global.config.ds_postgrado);

        let result = await con.request()
            .execute('TR_LISTAR_GRADUACION_CONJUNTA');
        con.close();

        let listGraduacionConjunta = result[0].map((a) => {
            return {
                Cod_GraduacionConjunta: a.Cod_GraduacionConjunta,
                Cod_institucion: a.Cod_institucion,
                Descripcion_institucion: a.Descripcion_institucion.trim()
            }
        }) || [];

        response.json(reply.ok(listGraduacionConjunta));

    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let getGraduacionConjunta_Prog = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'Cod_Programa', true);
        
        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);
            
            let result = await con.request()
                .input('COD_PROGRAMA', sql.Int, args.Cod_Programa)
                .execute('TR_LISTAR_GRADUACIONCONJUNTA_PROGRAMA');
            con.close();

            let graduacionConjunta_programa = result[0].map((a) => {
                return {
                    Cod_GraduacionConjunta_Programa: a.Cod_GraduacionConjunta_Programa,
                    Cod_Programa: a.Cod_programa,
                    Cod_GraduacionConjunta: a.Cod_GraduacionConjunta
                }
            }) || [];

            response.json(reply.ok(graduacionConjunta_programa));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let getGraduacionConjunta_Prog_All = async (request, response) => {
    try {
        let con = await sql.connect(global.config.ds_postgrado);

        let result = await con.request()
            .execute('TR_LISTAR_GRADUACIONCONJUNTA_PROGRAMA_ALL');
        con.close();

        let listGraduacionConjuntaAll = result[0].map((a) => {
            return {
                Cod_GraduacionConjunta_Programa: a.Cod_GraduacionConjunta_Programa,
                Cod_Programa: a.Cod_Programa,
                Cod_GraduacionConjunta: a.Cod_GraduacionConjunta
            }
        }) || [];

        response.json(reply.ok(listGraduacionConjuntaAll));

    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let insertGraduacionConjunta = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'Cod_GraduacionConjunta', true);
        msg += validador.validarParametro(args, 'numero', 'Cod_institucion', true);
        msg += validador.validarParametro(args, 'cadena', 'Descripcion_institucion', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_GRADUACIONCONJUNTA', sql.Int, args.Cod_GraduacionConjunta)
                .input('COD_INSTITUCION', sql.Int, args.Cod_institucion)
                .input('DESCRIPCION_INSTITUCION', sql.VarChar, args.Descripcion_institucion)
                .execute('SP_AGREGAR_GRADUACION_CONJUNTA');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let insertGraduacionConjunta_Prog = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'Cod_GraduacionConjunta_Programa', true);
        msg += validador.validarParametro(args, 'numero', 'Cod_Programa', true);
        msg += validador.validarParametro(args, 'numero', 'Cod_GraduacionConjunta', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_GRADUACIONCONJUNTA_PROGRAMA', sql.Int, args.Cod_GraduacionConjunta_Programa)
                .input('COD_PROGRAMA', sql.Int, args.Cod_Programa)
                .input('COD_GRADUACIONCONJUNTA', sql.Int, args.Cod_GraduacionConjunta)
                .execute('SP_AGREGAR_GRADUACIONCONJUNTA_PROGRAMA');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let updateGraduacionConjunta = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'Cod_GraduacionConjunta', true);
        msg += validador.validarParametro(args, 'numero', 'Cod_institucion', true);
        msg += validador.validarParametro(args, 'cadena', 'Descripcion_institucion', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_GRADUACIONCONJUNTA', sql.Int, args.Cod_GraduacionConjunta)
                .input('COD_INSTITUCION', sql.Int, args.Cod_institucion)
                .input('DESCRIPCION_INSTITUCION', sql.VarChar, args.Descripcion_institucion)
                .execute('SP_ACTUALIZAR_GRADUACION_CONJUNTA');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let updateGraduacionConjunta_Prog = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'Cod_GraduacionConjunta_Programa', true);
        msg += validador.validarParametro(args, 'numero', 'Cod_Programa', true);
        msg += validador.validarParametro(args, 'numero', 'Cod_GraduacionConjunta', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_GRADUACIONCONJUNTA_PROGRAMA', sql.Int, args.Cod_GraduacionConjunta_Programa)
                .input('COD_PROGRAMA', sql.Int, args.Cod_Programa)
                .input('COD_GRADUACIONCONJUNTA', sql.Int, args.Cod_GraduacionConjunta)
                .execute('SP_ACTUALIZAR_GRADUACIONCONJUNTA_PROGRAMA');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let deleteGraduacionConjunta = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'Cod_GraduacionConjunta', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_GRADUACIONCONJUNTA', sql.Int, args.Cod_GraduacionConjunta)
                .execute('SP_ELIMINAR_GRADUACION_CONJUNTA');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let deleteGraduacionConjunta_Prog = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'Cod_GraduacionConjunta_Programa', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_GRADUACIONCONJUNTA_PROGRAMA', sql.Int, args.Cod_GraduacionConjunta_Programa)
                .execute('SP_ELIMINAR_GRADUACIONCONJUNTA_PROGRAMA');
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
    getGraduacionConjunta,
    getGraduacionConjunta_Prog,
    getGraduacionConjunta_Prog_All,
    insertGraduacionConjunta,
    insertGraduacionConjunta_Prog,
    updateGraduacionConjunta,
    updateGraduacionConjunta_Prog,
    deleteGraduacionConjunta,
    deleteGraduacionConjunta_Prog
};