const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reminderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    beforeFood: {
        type: Boolean,
        default: false
    },
    morning: {
        type: Boolean,
        default: false
    },
    afternoon: {
        type: Boolean,
        default: false
    },
    night: {
        type: Boolean,
        default: false
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Reminder', reminderSchema);