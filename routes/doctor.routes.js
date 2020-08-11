const express = require('express');

const router = express.Router();

const doctorController = require('../controllers/doctor.controllers');

router.get('/', doctorController.getDoctor);

module.exports = router;