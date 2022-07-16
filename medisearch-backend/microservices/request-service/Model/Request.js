const mongoose = require("mongoose");

const Schema = mongoose.Schema;

requestSchema = new Schema({
    medicineName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
        // required: true
    },
    requestorData: {
        type: Array,
        default: []
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

// module.exports = Request = mongoose.model("Request", requestSchema);
module.exports = mongoose.models.Request || mongoose.model('Request', requestSchema);