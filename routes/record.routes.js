const express = require('express');

const router = express.Router();

const recordController = require('../controllers/record.controllers');

router.get('/', recordController.getRecord);

router.post('/', recordController.postRecord);

module.exports = router;