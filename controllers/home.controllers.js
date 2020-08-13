const moment = require('moment');
const Reminder = require('../models/Reminders');

exports.getIndex = async(req, res, next) => {
    try {
        let med = [];
        let time = 7;
        if (Number(moment().format('HH')) >= 9 && Number(moment().format('HH')) < 14) {
            time = 12;
            med = await Reminder.find({ userID: req.session.user._id, afternoon: true }).sort({ beforeFood: -1 })
        } else if (Number(moment().format('HH')) >= 14 && Number(moment().format('HH')) < 19) {
            time = 17;
            med = await Reminder.find({ userID: req.session.user._id, night: true }).sort({ beforeFood: -1 })
        } else if (Number(moment().format('HH')) >= 21) {
            time = 7;
            med = await Reminder.find({ userID: req.session.user._id, morning: true }).sort({ beforeFood: -1 });
        } else {
            time = 7;
            med = await Reminder.find({ userID: req.session.user._id, morning: true }).sort({ beforeFood: -1 })
        }
        res.render('index', { med, time });
    } catch (err) {
        next(err);
    }


}