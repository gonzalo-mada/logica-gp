
"use strict";

var express = require("express");
var methodOverride = require("method-override");

var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.setHeader("Access-Control-Max-Age", "60");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

global.log = require("./base/utils/logConsola");

var config = require("./config");
var rootPath = config.app.rootPath;
var loadConfig = require("./base/utils/loadConfig");

function cargaInicial() {
    loadConfig(config, function (data) {
        global.config = data;
    });
}

cargaInicial();

/* Router BASE (NO ELIMINAR) */
app.use(`/${rootPath}/base`, require("./base/routes/base.router"));

/* Routers proyecto */
//app.use(`/${rootPath}`, require("./proyecto/routes/proyectoBase.router"));

app.use(`/${rootPath}/estado`, require('./proyecto/routes/estado.router'));
app.use(`/${rootPath}/fechaIniPostulacion`, require('./proyecto/routes/fechaIniPostulacion.router'));
app.use(`/${rootPath}/fechaLimite`, require('./proyecto/routes/fechaLimite.router'));
app.use(`/${rootPath}/monetario`, require('./proyecto/routes/monetario.router'));
app.use(`/${rootPath}/tipoPrograma`, require('./proyecto/routes/tipoPrograma.router'));
app.use(`/${rootPath}/usuario`, require('./proyecto/routes/usuario.router'));
app.use(`/${rootPath}/unidadMonetaria`, require('./proyecto/routes/unidadMonetaria.router'));
app.use(`/${rootPath}/calendarioAcademico`, require('./proyecto/routes/calendarioAcademico.router'));
app.use(`/${rootPath}/fechaEsperaDocumentos`, require('./proyecto/routes/fechaEsperaDocumentos.router'));
app.use(`/${rootPath}/viaIngreso`, require('./proyecto/routes/viaIngreso.router'));
app.use(`/${rootPath}/financiamiento`, require('./proyecto/routes/financiamiento.router'));
app.use(`/${rootPath}/unidadesAcademicas`, require('./proyecto/routes/unidadesAcademicas.router'));
app.use(`/${rootPath}/categoriaTipoPrograma`, require('./proyecto/routes/categoriaTipoPrograma.router'));
app.use(`/${rootPath}/tiempoAcreditacion`, require('./proyecto/routes/tiempoAcreditacion.router'));
app.use(`/${rootPath}/reglamento`, require('./proyecto/routes/reglamento.router'));
app.use(`/${rootPath}/suspension`, require('./proyecto/routes/suspension.router'));
app.use(`/${rootPath}/programa`, require('./proyecto/routes/programa.router'));
app.use(`/${rootPath}/graduacionConjunta`, require('./proyecto/routes/graduacionConjunta.router'));
app.use(`/${rootPath}/modalidad`, require('./proyecto/routes/modalidad.router'));
app.use(`/${rootPath}/jornada`, require('./proyecto/routes/jornada.router'));

module.exports = app;
