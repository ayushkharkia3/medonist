const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/Users');

const authController = require('../controllers/auth.controllers');

router.get('/login', authController.getSignIn);

router.post('/login', [body('email', 'Invalid email.').not().isEmpty().isEmail().normalizeEmail(),
    body('password', 'Password should be between 6 to 15 characters.').not().isEmpty().isLength({ min: 6, max: 15 })
], authController.postSignIn);

router.post('/register', [body('name', 'Name is required.').not().isEmpty(),
    body('email', 'Invalid email.').not().isEmpty().isEmail().custom((value, { req }) => {
        return User.find({ email: value }).then(e => {
            if (e.length > 0) {
                return Promise.reject('Email already exists');
            }
        });
    }).normalizeEmail(),
    body('password', 'Password should be between 6 to 15 characters.').not().isEmpty().isLength({ min: 6, max: 15 })
], authController.postSignUp);

module.exports = router;