'use strict'

var express = require('express');
var calendarioAcademicoService = require('../services/calendarioAcademico.service');

var router = express.Router();

router.post('/getCalendarioAcademico', calendarioAcademicoService.getCalendarioAcademico);

module.exports = router;