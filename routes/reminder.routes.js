const express = require('express');

const router = express.Router();

const reminderController = require('../controllers/reminder.conrtrollers');

router.get('/', reminderController.getReminder);

router.post('/', reminderController.postReminder);

module.exports = router;