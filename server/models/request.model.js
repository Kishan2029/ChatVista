const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    senderUser: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    receiverUser: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    status: {
        type: String,
        enum: ['sent', 'accepted', 'rejected'],
        default: 'sent',
        required: true
    },

}, { timestamps: true });

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;