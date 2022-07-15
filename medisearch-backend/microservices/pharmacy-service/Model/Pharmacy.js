const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pharmacySchema = new Schema({
    _id: {
        type: Object,
        required: true
    },
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
        // required: true,
        default: "googleMapsLocation"
    },
    city: {
        type: String,
    },
    district: {
        type: String,
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
        default: 'Active'
    }
});

module.exports = Pharmacy = mongoose.model("Pharmacy", pharmacySchema);