const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    rooms: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Room'
        }
    ]
});

module.exports = mongoose.model('Hotel', hotelSchema);