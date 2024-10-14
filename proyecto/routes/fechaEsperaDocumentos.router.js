'use strict'

var express = require('express');
var fechaEsperaDocumentosService = require('../services/fechaEsperaDocumentos.service');

var router = express.Router();

router.post('/getFechaEsperaDocumentos', fechaEsperaDocumentosService.getFechaEsperaDocumentos);

module.exports = router;