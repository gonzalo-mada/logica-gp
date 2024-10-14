'use strict'

var express = require('express');
var programaService = require('../services/programa.service');

var router = express.Router();

router.post('/getLogPrograma', programaService.getLogPrograma);
router.post('/insertLogPrograma', programaService.insertLogPrograma);
router.post('/getProgramas', programaService.getProgramas);
router.post('/getPrograma', programaService.getPrograma);
router.post('/insertPrograma', programaService.insertPrograma);


module.exports = router;