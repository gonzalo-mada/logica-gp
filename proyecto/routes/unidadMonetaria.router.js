'use strict'

var express = require('express');
var unidadMonetariaService = require('../services/unidadMonetaria.service');

var router = express.Router();

router.post('/getUnidadMonetaria', unidadMonetariaService.getUnidadMonetaria);

module.exports = router;