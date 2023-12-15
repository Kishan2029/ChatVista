const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        trim: true
    },
    profileUrl: {
        type: String,
        trim: true
    },

}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;