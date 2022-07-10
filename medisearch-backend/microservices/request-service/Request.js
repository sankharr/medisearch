const mongoose = require("mongoose");

const Schema = mongoose.Schema;

requestSchema = new Schema({
    medicineList: {
        type: String,
        required: true
    },
    requestorName: {
        type: String,
        required: true
    },
    requestorDocID: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    availablePharmacies: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        default: 'Active'
    },
    lastUpdatedDate: {
        type: Date,
        default: new Date()
    }
});

module.exports = Request = mongoose.model("Request", requestSchema);