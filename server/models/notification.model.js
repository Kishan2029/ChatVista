const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
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
    count: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;