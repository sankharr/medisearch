const mongoose = require("mongoose");

const Schema = mongoose.Schema;

querySchema = new Schema({
    _id: {
        type: Object,
        required: true
    },
    requestorName: {
        type: String,
        required: true
    },
    requestorDocID: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: Number,
        // required: true
    },
    email: {
        type: String
        // required: true
    },
    city: {
        type: String
        // required: true
    },
    district: {
        type: String
        // required: true
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

module.exports = Query = mongoose.model("Query", querySchema);