const Records = require("../models/Records");
const e = require("express");

exports.getRecord = async(req, res, next) => {
    try {
        const record = await Records.findOne({ userID: req.session.user._id });
        res.render('record', { record });
    } catch (err) {
        next(err);
    }
}

exports.postRecord = async(req, res, next) => {
    try {
        const { name, age, gender, symptoms, medicines, dob } = req.body;
        console.log(req.body)
        const record = await Records.findOne({ userID: req.session.user._id });
        if (!record) {
            const newRecord = new Records({ name: name, age: age, gender: gender, symptoms: symptoms, medicines: medicines, dob: dob, userID: req.session.user._id });
            await newRecord.save();
        } else {
            record.name = name;
            record.age = age;
            record.gender = gender;
            record.symptoms = symptoms;
            record.medicines = medicines;
            record.dob = dob;
            await record.save();
        }
        res.redirect('/record');
    } catch (err) {
        next(err);
    }
}