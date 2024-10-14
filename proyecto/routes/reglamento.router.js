'use strict'

var express = require('express');
var reglamentoService = require('../services/reglamento.service');

var router = express.Router();

router.post('/getReglamento', reglamentoService.getReglamento);
router.post('/updateReglamento', reglamentoService.updateReglamento);
router.post('/insertReglamento', reglamentoService.insertReglamento);
router.post('/deleteReglamento', reglamentoService.deleteReglamento);

module.exports = router;
