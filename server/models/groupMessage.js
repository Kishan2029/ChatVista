import { Schema, model } from "mongoose";

const GroupMessageSchema = new Schema({
    groupId: {
        type: Schema.ObjectId,
        ref: 'group',
        required: true,
    },
    senderUser: {
        type: Schema.ObjectId,
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

const GroupMessage = model("GroupMessage", GroupMessageSchema);

export default GroupMessage;