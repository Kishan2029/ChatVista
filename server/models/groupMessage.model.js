const mongoose = require('mongoose');

const GroupMessageSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.ObjectId,
        ref: 'group',
        required: true,
    },
    senderUser: {
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

const GroupMessage = mongoose.model("GroupMessage", GroupMessageSchema);


module.exports = GroupMessage;
