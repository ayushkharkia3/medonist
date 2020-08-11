const User = require('../models/Users');

module.exports = async(req, res, next) => {
    try {
        if (!req.session.user) {
            req.flash('errorMessage', 'Please Login.')
            return res.redirect('/login');
        }
        const user = await User.findById(req.session.user._id);
        if (!user || user.password !== req.session.user.password) {
            req.flash('errorMessage', 'Please Login.')
            return res.redirect('/login');
        }
        next();
    } catch (err) {
        next(err);
    }
}