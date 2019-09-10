const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    dateIn: {
        type: Date,
        required: true
    },
    dateOut: {
        type: Date,
        required: true
    },
    madeBy: {
        guests: [{
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            birthDate: {
                type: Date,
                required: true
            },
            gender: {
                type: String,
                required: true
            },
            docType: {
                type: String,
                required: true
            },
            docNumber: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            }
        }],
        emergencyContact: {
            name: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            } 
        }
    },
    hotel:{
        type: Schema.Types.ObjectId,
        ref: 'Hotel'
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }
});

module.exports = mongoose.model('Reservarion', reservationSchema);