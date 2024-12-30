const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    birth_date: {
        type: Date,
    },
    maritalStatus: {
        type: String,
        enum: ['married', 'unMarried'],
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;