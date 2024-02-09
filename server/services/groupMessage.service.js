const User = require('../models/user.model');
const Group = require('../models/group.model');
const mongoose = require("mongoose");
const GroupMessage = require('../models/groupMessage.model');
const { isPartOfGroup } = require('./group.service');
const { dateFormate, timeFormate } = require('./message.service');


exports.createMessage = async function (userId, groupId, content) {
    const userExist = await User.findById(userId);
    if (!userExist) return { statusCode: 400, response: { success: false, message: "User is not registered." } };

    const groups = await Group.findById(groupId);
    if (!groups) return { statusCode: 400, response: { success: false, message: "Group does not exist." } };

    const partOfGroup = isPartOfGroup(userId, groups);
    if (!partOfGroup) return { statusCode: 400, response: { success: false, message: "User is not part of the group." } };

    // store in database
    const newMessage = new GroupMessage({
        senderUser: userId,
        groupId,
        status: "sent",
        content
    })

    await newMessage.save();
    return { statusCode: 200, response: { success: true, message: "You have sent the message." } };

}


exports.getMessage = async function (userId, groupId) {
    const userExist = await User.findById(userId);
    if (!userExist) return { statusCode: 400, response: { success: false, message: "User is not registered." } };

    const groups = await Group.findById(groupId);
    if (!groups) return { statusCode: 400, response: { success: false, message: "Group does not exist." } };

    const partOfGroup = isPartOfGroup(userId, groups);
    if (!partOfGroup) return { statusCode: 400, response: { success: false, message: "User is not part of the group." } };

    let messages = await GroupMessage.find({ groupId }).sort({ createdAt: 1 });

    const temp = new Map();
    await Promise.all(messages.map(async (msg) => {
        let date = dateFormate(msg.createdAt);
        const time = timeFormate(msg.createdAt);
        const createdByUser = await User.findById(msg.senderUser);

        if (dateFormate(new Date()) === date) {
            date = "Today"
        }

        const data = {
            content: msg.content,
            id: msg._id,
            createdAt: msg.createdAt,
            time: time,
            createdBy: msg.senderUser,
            createdByUser: createdByUser.firstName + " " + createdByUser.lastName
        }
        if (temp.has(date)) {
            temp.set(date, [...temp.get(date), data])
        }
        else {
            temp.set(date, [data])
        }
    }))
    messages = []
    for (let [key, value] of temp) {
        messages.push({
            date: key,
            messages: value.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
        })
    }

    // messages = messages.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
    return { statusCode: 200, response: { success: true, data: messages } };

}