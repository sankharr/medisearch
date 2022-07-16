const mongoose = require("mongoose");

const Schema = mongoose.Schema;

patientSchema = new Schema({
    _id: {
        type: Object,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
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

// module.exports = Patient = mongoose.model("Patient", patientSchema);
module.exports = mongoose.models.Patient || mongoose.model('Patient', patientSchema);