const express = require('express');

const router = express.Router();

const recommendationController = require('../controllers/recommendation.controllers');

router.get('/', recommendationController.getRecommendation);

router.post('/', recommendationController.postRecommendation);

module.exports = router;