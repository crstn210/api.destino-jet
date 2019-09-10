const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    number: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    taxes:{
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    maxCapacity:{
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('Room', roomSchema);