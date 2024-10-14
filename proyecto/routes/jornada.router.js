'use strict'

var express = require('express');
var jornadaService = require('../services/jornada.service');

var router = express.Router();

router.post('/getJornadas', jornadaService.getJornadas);
router.post('/insertJornada', jornadaService.insertJornada);
router.post('/updateJornada', jornadaService.updateJornada);
router.post('/deleteJornada', jornadaService.deleteJornada);

module.exports = router;
