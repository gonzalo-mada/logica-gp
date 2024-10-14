'use strict'

var express = require('express');
var fechaIniPostulacionService = require('../services/fechaIniPostulacion.service');
var router = express.Router();

router.post('/getFechaInicioPostulacion', fechaIniPostulacionService.getFechaInicioPostulacion);

module.exports = router;