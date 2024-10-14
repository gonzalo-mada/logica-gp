'use strict'

var express = require('express');
var modalidadService = require('../services/modalidad.service');

var router = express.Router();

router.post('/getModalidades', modalidadService.getModalidades);
router.post('/insertModalidad', modalidadService.insertModalidad);
router.post('/updateModalidad', modalidadService.updateModalidad);
router.post('/deleteModalidad', modalidadService.deleteModalidad);

module.exports = router;
