'use strict'

var express = require('express');
var tiempoAcreditacionService = require('../services/tiempoAcreditacion.service');

var router = express.Router();

router.post('/getTiempoAcreditacion', tiempoAcreditacionService.getTiempoAcreditacion);
router.post('/updateTiempoAcreditacion', tiempoAcreditacionService.updateTiempoAcreditacion);
router.post('/insertTiempoAcreditacion', tiempoAcreditacionService.insertTiempoAcreditacion);
router.post('/deleteTiempoAcreditacion', tiempoAcreditacionService.deleteTiempoAcreditacion);

module.exports = router;
