const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    days: {
        type: Number,
    },
    amount: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    customerName : {
        type: String,
        required: true
    },
    eventColor: {
        type: String,
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