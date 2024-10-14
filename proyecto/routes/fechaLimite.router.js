'use strict'

var express = require('express');
var fechaLimiteService = require('../services/fechaLimite.service');

var router = express.Router();

router.post('/getFechaLimite', fechaLimiteService.getFechaLimite);

module.exports = router;