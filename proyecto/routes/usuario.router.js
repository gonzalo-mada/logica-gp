'use strict'

var express = require('express');
var usuarioService = require('../services/usuario.service');

var router = express.Router();

router.post('/getPersonalUa', usuarioService.getPersonalUa);
router.post('/getUsuariosProgramas', usuarioService.getUsuariosProgramas);

module.exports = router;