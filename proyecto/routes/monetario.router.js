'use strict'

var express = require('express');
var monetarioService = require('../services/monetario.service');

var router = express.Router();

router.post('/getValorUf', monetarioService.getValorUf);
router.post('/getValorDolar', monetarioService.getValorDolar);

module.exports = router;