const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
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
        enum: ['sent', 'received', 'seen'],
        default: 'sent',
        required: true
    },
    content: {
        type: String,
        required: true
    }

}, { timestamps: true });

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;