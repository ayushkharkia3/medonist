const { validationResult } = require('express-validator');

const User = require('../models/Users')

const hashPassword = require('../utils/hash-password');

exports.getSignIn = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    res.render('login');
}

exports.postSignUp = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('errorMessage', errors.array()[0].msg);
            return res.redirect('/login');
        }
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password: hashPassword(password) });
        const user = await newUser.save();
        req.session.user = user;
        return req.session.save(err => {
            if (err) throw new Error(err);
            return res.redirect('/');
        });
    } catch (err) {
        next(err);
    }
}

exports.postSignIn = async(req, res, next) => {
    try {
        const { password, email } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('errorMessage', errors.array()[0].msg);
            return res.redirect('/login');
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            req.flash('errorMessage', 'Invalid email.');
            return res.redirect('/login');
        }
        const matchPassword = user.validatePassword(password);
        if (!matchPassword) {
            req.flash('errorMessage', 'Invalid Password');
            return res.redirect('/login');
        }
        req.session.user = user;
        return req.session.save(err => {
            if (err) throw new Error(err);
            return res.redirect('/');
        });
    } catch (err) {
        next(err);
    }
}