const moment = require('moment');

const Reminder = require('../models/Reminders');

exports.getReminder = async(req, res, next) => {
    try {
        const morning = await Reminder.find({ userID: req.session.user._id, morning: true }).sort({ beforeFood: -1 });
        const afternoon = await Reminder.find({ userID: req.session.user._id, afternoon: true }).sort({ beforeFood: -1 });
        const night = await Reminder.find({ userID: req.session.user._id, night: true }).sort({ beforeFood: -1 });
        res.render('reminder', { morning, afternoon, night });
    } catch (err) {
        next(err);
    }
}

exports.postReminder = async(req, res, next) => {
    try {
        const { name, start, end, radio, morning, afternoon, evening } = req.body;
        // if (moment(end).isBefore(moment(start)) || moment(new Date()).isSameOrBefore(start)) {
        //     req.flash('errorMessage', 'Invalid Start and end date.')
        //     return res.redirect('/reminder');
        // }
        if (!(radio === 'beforeFood' || radio === 'afterFood')) {
            req.flash('errorMessage', 'Please select before or after food.')
            return res.redirect('/reminder');
        }
        if ((!morning) && (!afternoon) && (!evening)) {
            req.flash('errorMessage', 'Please select time.')
            return res.redirect('/reminder');
        }
        const newReminder = new Reminder({ name: name, start: start, end: end, beforeFood: (radio === 'beforeFood') ? true : false, morning: (morning) ? true : false, afternoon: (afternoon) ? true : false, night: (evening) ? true : false, userID: req.session.user._id });
        await newReminder.save();
        res.redirect('/reminder');
    } catch (err) {
        next(err);
    }
}