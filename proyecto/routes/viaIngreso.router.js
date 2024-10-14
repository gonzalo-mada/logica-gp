'use strict'

var express = require('express');
var viaIngresoService = require('../services/viaIngreso.service');

var router = express.Router();

router.post('/getViasIngreso', viaIngresoService.getViasIngreso);

module.exports = router;