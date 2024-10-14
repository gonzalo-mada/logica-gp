'use strict'

var sql = require('mssql');
var reply = require('../../base/utils/reply');
var validador = require('../../base/utils/validador');

let getProgramas = async (request, response) => {

    try {
        let con = await sql.connect(global.config.ds_postgrado);

        let programas = await con.request().execute('TR_LISTAR_PROGRAMAS');
        let campuses = await con.request().execute('TR_LISTAR_CAMPUS');
        let tipos_programas = await con.request().execute('TR_LISTAR_TIPO_PROGRAMA');
        let categorias_tp = await con.request().execute('TR_LISTAR_CATEGORIAS_TP');
        let acreditaciones = await con.request().execute('TR_LISTAR_ACREDITACIONES');
        let tiempos_acred = await con.request().execute('TR_LISTAR_TIEMPOACREDIT');
        let estados_maestros = await con.request().execute('TR_LISTAR_ESTADO_MAESTRO');
        let suspensiones = await con.request().execute('TR_LISTAR_SUSPENSION');
        let reglamentos = await con.request().execute('TR_LISTAR_REGLAMENTO');
        let unidades = await con.request().execute('TR_LISTAR_UNIDAD_ACADEMICA');
        let facultades = await con.request().execute('TR_LISTAR_FACULTAD');
        con.close();
        
        let listProgramas = programas[0].map( prog => {
            let campus = campuses[0].find( campus => campus.Cod_Campus === prog.Campus )
            let t_p = tipos_programas[0].find( t_p => t_p.Cod_tipoPrograma === prog.Tipo_programa)
            let cat_tp = categorias_tp[0].find(cat_tp => cat_tp.Cod_CategoriaTP === t_p.Cod_CategoriaTP)
            let acredit = acreditaciones[0].find(acredit => acredit.Cod_acreditacion === prog.Cod_acreditacion)
            let tiempos = tiempos_acred[0].find(tiempos => tiempos.Cod_tiempoacredit === acredit.Cod_tiempoacredit)
            let est_ma = estados_maestros[0].find(est_ma => est_ma.Cod_EstadoMaestro === prog.Estado_maestro)
            let susp = suspensiones[0].find(susp => susp.ID_TipoSuspension === prog.ID_TipoSuspension)
            let reg = reglamentos[0].find(reg => reg.Id_reglamento === prog.ID_Reglamento)
            let unidacad = unidades[0].find(unidacad => unidacad.Cod_unidad_academica === prog.Unidad_academica)
            let facus = facultades[0].find(facus => facus.Cod_facultad === unidacad.Cod_facultad)
            return {
                "Cod_Programa": prog.Cod_Programa,
                "Centro_costo": prog.Centro_costo.trim(),
                "Nombre_programa": prog.Nombre_programa.trim(),
                "Titulo": prog.Titulo.trim(),
                "Director": prog.Director,
                "Director_alterno": prog.Director_alterno,
                "Rexe": prog.Rexe.trim(),
                "Codigo_SIES": prog.Codigo_SIES.trim(),
                "Creditos_totales": prog.Creditos_totales,
                "Horas_totales": prog.Horas_totales,
                "Grupo_correo": prog.Grupo_correo.trim(),
                "Grado_academico": prog.Grado_academico.trim(),
                "Campus" : campus ? {
                    "Cod_Campus": campus.Cod_Campus,
                    "Descripcion_campus": campus.Descripcion_campus.trim(),
                    "Estado_campus": campus.Estado_campus,
                } : null,
                "Estado_maestro" : est_ma ? {
                    "Cod_EstadoMaestro": est_ma.Cod_EstadoMaestro,
                    "Descripcion_EstadoMaestro": est_ma.Descripcion_EstadoMaestro.trim(),
                } : null,
                "Suspension" : susp ? {
                    "ID_TipoSuspension": susp.ID_TipoSuspension,
                    "Descripcion_TipoSuspension": susp.Descripcion_TipoSuspension.trim(),
                } : null,
                "Reglamento" : reg ? {
                    "Id_reglamento": reg.Id_reglamento,
                    "Descripcion_reglamento": reg.Descripcion_reglamento.trim(),
                    "Anio": reg.Anio,
                    "Vigencia": reg.Vigencia.trim(),
                } : null,
                "Tipo_programa" : t_p ? {
                    "Cod_tipoPrograma": t_p.Cod_tipoPrograma,
                    "Descripcion_tp": t_p.Descripcion_tp.trim(),
                    "Categoria" : cat_tp ? {
                        "Cod_CategoriaTP": cat_tp.Cod_CategoriaTP,
                        "Descripcion_categoria": cat_tp.Descripcion_categoria.trim(),
                    } : null
                } : null,
                "Unidad_academica" : unidacad ? {
                    "Cod_unidad_academica": unidacad.Cod_unidad_academica,
                    "Descripcion_ua": unidacad.Descripcion_ua.trim(),
                    "Facultad" : facus ? {
                        "Cod_facultad": facus.Cod_facultad,
                        "Descripcion_facu": facus.Descripcion_facu.trim(),
                        "Estado": facus.Estado_facu,
                    } : null
                } : null,
                "Acreditacion": acredit ? {
                    "Cod_acreditacion": acredit.Cod_acreditacion,
                    "Acreditado": acredit.Acreditado.trim(),
                    "Certificado": acredit.Certificado.trim(),
                    "Nombre_ag_acredit": acredit.Nombre_ag_acredit.trim(),
                    "Nombre_ag_certif": acredit.Nombre_ag_certif.trim(),
                    "Evaluacion_interna": acredit.Evaluacion_interna,
                    "Fecha_informe": acredit.Fecha_informe,
                    "tiempo": tiempos ? {
                        "Cod_tiempoacredit": tiempos.Cod_tiempoacredit,
                        "Fecha_inicio": tiempos.Fecha_inicio,
                        "Fecha_termino": tiempos.Fecha_termino,
                        "Cantidad_anios": tiempos.Cantidad_anios,
                    } : null
                } : null,
                "Graduacion_Conjunta": prog.Graduacion_Conjunta,
            } 
        })
        response.json(reply.ok(listProgramas));        
    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let getLogPrograma = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'Cod_Programa', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_PROGRAMA', sql.Int, args.Cod_Programa)
                .execute('TR_LISTAR_LOG_PROGRAMA');
            con.close();

            let listLogPrograma = result[0].map((a) => {
                return {
                    Cod_Programa: a.Cod_Programa,
                    descripcion: a.Descripcion.trim(),
                    fecha: a.Fecha,
                    tipo_movimiento: a.Tipo_movimiento,
                    usuario: a.Usuario,
                    nombre_usuario: a.Nombre_usuario.trim(),
                    correo_usuario: a.Correo,
                }
            }) || [];

            response.json(reply.ok(listLogPrograma));
        }else{
            response.json(reply.error(msg));
        }

    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let insertLogPrograma = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'Cod_Programa', true);
        msg += validador.validarParametro(args, 'cadena', 'descripcion', true);
        msg += validador.validarParametro(args, 'cadena', 'fecha', true);
        msg += validador.validarParametro(args, 'cadena', 'tipo_movimiento', true);
        msg += validador.validarParametro(args, 'cadena', 'usuario', true);
        msg += validador.validarParametro(args, 'cadena', 'nombre_usuario', true);
        msg += validador.validarParametro(args, 'cadena', 'correo_usuario', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_PROGRAMA', sql.Int, args.Cod_Programa)
                .input('DESCRIPCION', sql.VarChar, args.descripcion)
                .input('FECHA', sql.VarChar, args.fecha)
                .input('TIPO_MOVIMIENTO', sql.VarChar, args.tipo_movimiento)
                .input('USUARIO', sql.VarChar, args.usuario)
                .input('NOMBRE_USUARIO', sql.VarChar, args.nombre_usuario)
                .input('CORREO', sql.VarChar, args.correo_usuario)
                .execute('SP_AGREGAR_LOGPROGRAMA');
            con.close();
            response.json(reply.ok(true));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let getProgramas_new = async (request, response) => {

    try {
        let con = await sql.connect(global.config.ds_postgrado);

        let programas = await con.request().execute('TR_LISTAR_PROGRAMAS');
        let campuses = await con.request().execute('TR_LISTAR_CAMPUS');
        let tipos_programas = await con.request().execute('TR_LISTAR_TIPO_PROGRAMA');
        let categorias_tp = await con.request().execute('TR_LISTAR_CATEGORIAS_TP');
        let acreditaciones = await con.request().execute('TR_LISTAR_ACREDITACIONES');
        let tiempos_acred = await con.request().execute('TR_LISTAR_TIEMPOACREDIT');
        let estados_maestros = await con.request().execute('TR_LISTAR_ESTADO_MAESTRO');
        let suspensiones = await con.request().execute('TR_LISTAR_SUSPENSION');
        let reglamentos = await con.request().execute('TR_LISTAR_REGLAMENTO');
        let unidades = await con.request().execute('TR_LISTAR_UNIDAD_ACADEMICA');
        let facultades = await con.request().execute('TR_LISTAR_FACULTAD');
        con.close();
        
        let listProgramas = programas[0].map( prog => {
            let campus = campuses[0].find( campus => campus.Cod_Campus === prog.Campus )
            let t_p = tipos_programas[0].find( t_p => t_p.Cod_tipoPrograma === prog.Tipo_programa)
            let cat_tp = categorias_tp[0].find(cat_tp => cat_tp.Cod_CategoriaTP === t_p.Cod_CategoriaTP)
            let acredit = acreditaciones[0].find(acredit => acredit.Cod_acreditacion === prog.Cod_acreditacion)
            let tiempos = tiempos_acred[0].find(tiempos => tiempos.Cod_tiempoacredit === acredit.Cod_tiempoacredit)
            let est_ma = estados_maestros[0].find(est_ma => est_ma.Cod_EstadoMaestro === prog.Estado_maestro)
            let susp = suspensiones[0].find(susp => susp.ID_TipoSuspension === prog.ID_TipoSuspension)
            let reg = reglamentos[0].find(reg => reg.Id_reglamento === prog.ID_Reglamento)
            let unidacad = unidades[0].find(unidacad => unidacad.Cod_unidad_academica === prog.Unidad_academica)
            let facus = facultades[0].find(facus => facus.Cod_facultad === unidacad.Cod_facultad)
            return {
                "Cod_Programa": prog.Cod_Programa,
                "Centro_costo": prog.Centro_costo.trim(),
                "Nombre_programa": prog.Nombre_programa.trim(),
                "Titulo": prog.Titulo.trim(),
                "Director": prog.Director,
                "Director_alterno": prog.Director_alterno,
                "Rexe": prog.Rexe.trim(),
                "Codigo_SIES": prog.Codigo_SIES.trim(),
                "Creditos_totales": prog.Creditos_totales,
                "Horas_totales": prog.Horas_totales,
                "Grupo_correo": prog.Grupo_correo.trim(),
                "Grado_academico": prog.Grado_academico.trim(),
                "Campus" : campus.Descripcion_campus.trim(),
                "Estado_maestro" : est_ma.Descripcion_EstadoMaestro.trim(),
                "Suspension" : susp ? {
                    "ID_TipoSuspension": susp.ID_TipoSuspension,
                    "Descripcion_TipoSuspension": susp.Descripcion_TipoSuspension.trim(),
                } : null,
                "Reglamento" : reg ? {
                    "Id_reglamento": reg.Id_reglamento,
                    "Descripcion_reglamento": reg.Descripcion_reglamento.trim(),
                    "Anio": reg.Anio,
                    "Vigencia": reg.Vigencia.trim(),
                } : null,
                "Tipo_programa" : t_p ? {
                    "Cod_tipoPrograma": t_p.Cod_tipoPrograma,
                    "Descripcion_tp": t_p.Descripcion_tp.trim(),
                    "Categoria" : cat_tp ? {
                        "Cod_CategoriaTP": cat_tp.Cod_CategoriaTP,
                        "Descripcion_categoria": cat_tp.Descripcion_categoria.trim(),
                    } : null
                } : null,
                "Unidad_academica" : unidacad ? {
                    "Cod_unidad_academica": unidacad.Cod_unidad_academica,
                    "Descripcion_ua": unidacad.Descripcion_ua.trim(),
                    "Facultad" : facus ? {
                        "Cod_facultad": facus.Cod_facultad,
                        "Descripcion_facu": facus.Descripcion_facu.trim(),
                        "Estado": facus.Estado_facu,
                    } : null
                } : null,
                "Acreditacion": acredit ? {
                    "Cod_acreditacion": acredit.Cod_acreditacion,
                    "Acreditado": acredit.Acreditado.trim(),
                    "Certificado": acredit.Certificado.trim(),
                    "Nombre_ag_acredit": acredit.Nombre_ag_acredit.trim(),
                    "Nombre_ag_certif": acredit.Nombre_ag_certif.trim(),
                    "Evaluacion_interna": acredit.Evaluacion_interna,
                    "Fecha_informe": acredit.Fecha_informe,
                    "tiempo": tiempos ? {
                        "Cod_tiempoacredit": tiempos.Cod_tiempoacredit,
                        "Fecha_inicio": tiempos.Fecha_inicio,
                        "Fecha_termino": tiempos.Fecha_termino,
                        "Cantidad_anios": tiempos.Cantidad_anios,
                    } : null
                } : null,
                "Graduacion_Conjunta": prog.Graduacion_Conjunta,
            } 
        })
        response.json(reply.ok(listProgramas));        
    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let getPrograma = async (request,response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'Cod_Programa', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);
            
            let result = await con.request()
                .input('COD_PROGRAMA', sql.Int, args.Cod_Programa)
                .execute('TR_LISTAR_UN_PROGRAMA');
            con.close();

            let programa = result[0].map((prog) => {
                return {
                    Cod_Programa: prog.Cod_Programa,
                    Centro_costo: prog.Centro_costo,
                    Nombre_programa: prog.Nombre_programa.trim(),
                    Tipo_programa: prog.Tipo_programa,
                    Titulo: prog.Titulo,
                    Director: prog.Director,
                    Director_alterno: prog.Director_alterno,
                    REXE: prog.Rexe.trim(),
                    Codigo_SIES: prog.Codigo_SIES,
                    Cod_Reglamento: prog.ID_Reglamento,
                    Cod_acreditacion: prog.Cod_acreditacion,
                    Creditos_totales: prog.Creditos_totales,
                    Horas_totales: prog.Horas_totales,
                    Grupo_correo: prog.Grupo_correo,
                    Cod_EstadoMaestro: prog.Estado_maestro,
                    Campus: prog.Campus,
                    Unidad_academica: prog.Unidad_academica,
                    Grado_academico: prog.Grado_academico,
                    ID_TipoSuspension: prog.ID_TipoSuspension,
                    Graduacion_Conjunta: prog.Graduacion_Conjunta,
                }
            }) || [];
            
            response.json(reply.ok(programa[0]));
        } else {
            response.json(reply.error(msg));
        }
    } catch (e) {
        response.json(reply.fatal(e));
    }
}

let insertPrograma = async (request, response) => {
    try {
        let args = JSON.parse(request.body.arg === undefined ? '{}' : request.body.arg);
        let msg = validador.validarParametro(args, 'numero', 'Cod_Programa', true);
        msg += validador.validarParametro(args, 'numero', 'Centro_costo', true);
        msg += validador.validarParametro(args, 'cadena', 'Nombre_programa', true);
        msg += validador.validarParametro(args, 'numero', 'Tipo_programa', true);
        msg += validador.validarParametro(args, 'cadena', 'Titulo', true);
        msg += validador.validarParametro(args, 'cadena', 'Director', true);
        msg += validador.validarParametro(args, 'cadena', 'Director_alterno', true);
        msg += validador.validarParametro(args, 'cadena', 'Rexe', true);
        msg += validador.validarParametro(args, 'cadena', 'Codigo_SIES', true);
        msg += validador.validarParametro(args, 'numero', 'Cod_Reglamento', true);
        msg += validador.validarParametro(args, 'numero', 'Cod_acreditacion', true);
        msg += validador.validarParametro(args, 'numero', 'Creditos_totales', true);
        msg += validador.validarParametro(args, 'numero', 'Horas_totales', true);
        msg += validador.validarParametro(args, 'cadena', 'Grupo_correo', true);
        msg += validador.validarParametro(args, 'numero', 'Cod_EstadoMaestro', true);
        msg += validador.validarParametro(args, 'numero', 'Campus', true);
        msg += validador.validarParametro(args, 'numero', 'Unidad_academica', true);
        msg += validador.validarParametro(args, 'cadena', 'Grado_academico', true);
        msg += validador.validarParametro(args, 'numero', 'ID_TipoSuspension', true);
        msg += validador.validarParametro(args, 'numero', 'Graduacion_Conjunta', true);

        if (msg == '') {
            let con = await sql.connect(global.config.ds_postgrado);

            let result = await con.request()
                .input('COD_PROGRAMA', sql.Int, args.Cod_Programa)
                .input('CENTRO_COSTO', sql.Int, args.Centro_costo)
                .input('NOMBRE_PROGRAMA', sql.VarChar, args.Nombre_programa)
                .input('TIPO_PROGRAMA', sql.Int, args.Tipo_programa)
                .input('TITULO', sql.VarChar, args.Titulo)
                .input('DIRECTOR', sql.VarChar, args.Director)
                .input('DIRECTOR_ALTERNO', sql.VarChar, args.Director_alterno)
                .input('REXE', sql.VarChar, args.Rexe)
                .input('CODIGO_SIES', sql.VarChar, args.Codigo_SIES)
                .input('ID_REGLAMENTO', sql.Int, args.Cod_Reglamento)
                .input('COD_ACREDITACION', sql.Int, args.Cod_acreditacion)
                .input('CREDITOS_TOTALES', sql.Int, args.Creditos_totales)
                .input('HORAS_TOTALES', sql.Int, args.Horas_totales)
                .input('GRUPO_CORREO', sql.VarChar, args.Grupo_correo)
                .input('ESTADO_MAESTRO', sql.Int, args.Cod_EstadoMaestro)
                .input('CAMPUS', sql.Int, args.Campus)
                .input('UNIDAD_ACADEMICA', sql.Int, args.Unidad_academica)
                .input('GRADO_ACADEMICO', sql.VarChar, args.Grado_academico)
                .input('ID_TIPOSUSPENSION', sql.Int, args.ID_TipoSuspension)
                .input('GRADUACION_CONJUNTA', sql.Int, args.Graduacion_Conjunta)
                .execute('SP_AGREGAR_PROGRAMA');
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
    getLogPrograma,
    insertLogPrograma,
    getProgramas,
    getPrograma,
    insertPrograma
};