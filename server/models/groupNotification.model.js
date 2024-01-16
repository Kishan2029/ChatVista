const mongoose = require("mongoose");

const GroupNotificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    groupId: {
        type: mongoose.Schema.ObjectId,
        ref: 'group',
        required: true,
    },
    count: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const GroupNotification = mongoose.model("GroupNotification", GroupNotificationSchema);

module.exports = GroupNotification;