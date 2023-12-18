const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    members: [{
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    }],
    about: {
        type: String,
        trim: true
    },
    profileUrl: {
        type: String,
        trim: true
    },
    admin: [{
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    }],

}, { timestamps: true });

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;