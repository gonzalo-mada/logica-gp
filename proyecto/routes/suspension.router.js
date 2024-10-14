'use strict'

var express = require('express');
var suspensionService = require('../services/suspension.service');

var router = express.Router();

router.post('/getSupension', suspensionService.getSupension);
router.post('/updateSuspension', suspensionService.updateSuspension);
router.post('/insertSuspension', suspensionService.insertSuspension);
router.post('/deleteSupension', suspensionService.deleteSupension);

module.exports = router;