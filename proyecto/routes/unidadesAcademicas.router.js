'use strict'

var express = require('express');
var unidadesAcademicasService = require('../services/unidadesAcademicas.service');

var router = express.Router();

router.post('/getUnidadesAcademicas', unidadesAcademicasService.getUnidadesAcademicas);
router.post('/updateUnidadesAcademicas', unidadesAcademicasService.updateUnidadesAcademicas);
router.post('/insertUnidadesAcademicas', unidadesAcademicasService.insertUnidadesAcademicas);
router.post('/deleteUnidadesAcademicas', unidadesAcademicasService.deleteUnidadesAcademicas);

module.exports = router;
