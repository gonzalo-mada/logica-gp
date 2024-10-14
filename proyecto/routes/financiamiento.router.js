'use strict'

var express = require('express');
var financiamientoService = require('../services/financiamiento.service');

var router = express.Router();

router.post('/getAllFinanciamientos', financiamientoService.getAllFinanciamientos);

module.exports = router;