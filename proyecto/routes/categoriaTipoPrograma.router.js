'use strict'

var express = require('express');
var categoriaTipoProgramaService = require('../services/categoriaTipoPrograma.service');

var router = express.Router();

router.post('/getCategoriaTipoPrograma', categoriaTipoProgramaService.getCategoriaTipoPrograma);
router.post('/updateCategoriaTipoPrograma', categoriaTipoProgramaService.updateCategoriaTipoPrograma);
router.post('/insertCategoriaTipoPrograma', categoriaTipoProgramaService.insertCategoriaTipoPrograma);
router.post('/deleteCategoriaTipoPrograma', categoriaTipoProgramaService.deleteCategoriaTipoPrograma);

module.exports = router;
