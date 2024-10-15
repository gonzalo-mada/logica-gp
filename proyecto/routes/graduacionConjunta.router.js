'use strict'

var express = require('express');
var graduacionConjuntaService = require('../services/graduacionConjunta.service');

var router = express.Router();

router.post('/getGraduacionConjunta', graduacionConjuntaService.getGraduacionConjunta);
router.post('/getGraduacionConjunta_Prog', graduacionConjuntaService.getGraduacionConjunta_Prog);
router.post('/getGraduacionConjunta_Prog_All', graduacionConjuntaService.getGraduacionConjunta_Prog_All);
router.post('/insertGraduacionConjunta', graduacionConjuntaService.insertGraduacionConjunta);
router.post('/insertGraduacionConjunta_Prog', graduacionConjuntaService.insertGraduacionConjunta_Prog);
router.post('/updateGraduacionConjunta', graduacionConjuntaService.updateGraduacionConjunta);
router.post('/updateGraduacionConjunta_Prog', graduacionConjuntaService.updateGraduacionConjunta_Prog);
router.post('/deleteGraduacionConjunta', graduacionConjuntaService.deleteGraduacionConjunta);
router.post('/deleteGraduacionConjunta_Prog', graduacionConjuntaService.deleteGraduacionConjunta_Prog);



module.exports = router;