const express = require('express');

const router = express.Router();

const homeRoutes = require('./home.routes');
const doctorRoutes = require('./doctor.routes');
const recordRoutes = require('./record.routes');
const recommendationRoutes = require('./recommendation.routes');
const reminderRoutes = require('./reminder.routes');
const authRoutes = require('./auth.routes');
const aboutRoutes = require('./about.routes');

const isAuth = require('../middlewares/is-Auth');

router.use('/', authRoutes);

router.use('/', isAuth, homeRoutes);
router.use('/about', isAuth, aboutRoutes);
router.use('/doctor', isAuth, doctorRoutes);
router.use('/record', isAuth, recordRoutes);
router.use('/recommendation', isAuth, recommendationRoutes);
router.use('/reminder', isAuth, reminderRoutes);

module.exports = router;