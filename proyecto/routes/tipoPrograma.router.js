'use strict'

var express = require('express');
var tipoProgramaService = require('../services/tipoPrograma.service');

var router = express.Router();

router.post('/getTipoPrograma', tipoProgramaService.getTipoPrograma);
router.post('/updateTipoPrograma', tipoProgramaService.updateTipoPrograma);
router.post('/insertTipoPrograma', tipoProgramaService.insertTipoPrograma);
router.post('/deleteTipoPrograma', tipoProgramaService.deleteTipoPrograma);

module.exports = router;
