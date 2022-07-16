const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    userType: String,
    created_at: {
        type: Date,
        default: new Date()
    },
});

// module.exports = user = mongoose.model("user", UserSchema);
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);