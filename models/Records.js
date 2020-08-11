const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordSchema = new Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    dob: {
        type: String,
    },
    gender: {
        type: String
    },
    symptoms: {
        type: String,
    },
    medicines: {
        type: String
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Record', recordSchema);