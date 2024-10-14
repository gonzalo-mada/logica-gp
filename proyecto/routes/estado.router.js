'use strict'

var express = require('express');
var estadoService = require('../services/estado.service');

var router = express.Router();

router.post('/getEstados', estadoService.getEstados);
router.post('/getEstadosPrograma', estadoService.getEstadosPrograma);
router.post('/getEstadosSira', estadoService.getEstadosSira);
router.post('/getEstadosMaestros', estadoService.getEstadosMaestros);
router.post('/getEstadosAcreditacion', estadoService.getEstadosAcreditacion);
router.post('/updateEstadoAcreditacion', estadoService.updateEstadoAcreditacion);
router.post('/insertEstadoAcreditacion', estadoService.insertEstadoAcreditacion);
router.post('/deleteEstadoAcreditacion', estadoService.deleteEstadoAcreditacion);

module.exports = router;