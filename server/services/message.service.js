const Request = require('../models/user.model');
const User = require('../models/user.model');
const Message = require('../models/message.model');

const dateFormate = (date) => {
    // Define options for formatting
    const options1 = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = date.toLocaleDateString("en-US", options1);

    return formattedDate;
}

const timeFormate = (date) => {
    // Get hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();
    // Determine AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be converted to 12 in 12-hour format

    // Format the time
    const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

    return formattedTime;
}



exports.createMessage = async function (userA, userB, content) {
    const userAExist = await User.findById(userA);
    if (!userAExist) return { statusCode: 400, response: { success: false, message: "UserA is not registered." } };

    const userBExist = await User.findById(userB);
    if (!userBExist) return { statusCode: 400, response: { success: false, message: "UserB is not registered." } };

    // store in database
    const newMessage = new Message({
        senderUser: userA,
        receiverUser: userB,
        status: "sent",
        content
    })

    await newMessage.save();
    return { statusCode: 200, response: { success: true, message: "You have sent the message." } };

}


exports.getMessage = async function (userA, userB, content) {
    const userAExist = await User.findById(userA);
    if (!userAExist) return { statusCode: 400, response: { success: false, message: "UserA is not registered." } };

    const userBExist = await User.findById(userB);
    if (!userBExist) return { statusCode: 400, response: { success: false, message: "UserB is not registered." } };

    let messages = await Message.find({ $or: [{ senderUser: userA, receiverUser: userB }, { senderUser: userB, receiverUser: userA }] }).sort({ createdAt: 1 });

    // formate the messages
    // [
    //     {
    //         date:"",
    //         messages:""
    //     }
    // ]
    const temp = new Map();
    messages.forEach((msg) => {
        let date = dateFormate(msg.createdAt);
        const time = timeFormate(msg.createdAt);

        if (dateFormate(new Date()) === date) {
            date = "Today"
        }

        const data = {
            content: msg.content,
            id: msg._id,
            createdAt: msg.createdAt,
            time: time,
            createdBy: msg.senderUser
        }
        if (temp.has(date)) {
            temp.set(date, [...temp.get(date), data])
        }
        else {
            temp.set(date, [data])
        }
    })
    messages = []
    for (let [key, value] of temp) {
        messages.push({
            date: key,
            messages: value
        })
    }

    return { statusCode: 200, response: { success: true, data: messages } };

}