const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    nazwaWydarzenia: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    liczbaMiejsc: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Event', eventSchema);