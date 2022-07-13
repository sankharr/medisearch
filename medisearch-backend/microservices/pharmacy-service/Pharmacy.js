const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    city: {
        type: Number,
    },
    district: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    availableMedicines : {
        type: Array,
        default: []
    },
    lastUpdatedDate: {
        type: Date,
        default: new Date()
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = Reservation = mongoose.model("Reservation", reservationSchema);