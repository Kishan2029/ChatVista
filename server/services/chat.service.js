const Request = require('../models/user.model');
const User = require('../models/user.model');
const Message = require('../models/message.model');
const { getFriendList } = require('./user.service');

const dateDiffInDays = (a, b) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}


const getFormattedTime = (date) => {

    const today = new Date();
    const diff = dateDiffInDays(date, today);

    if (diff === 0) {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
        return formattedTime;
    }
    else if (diff === 1) {
        return "Yesterday";
    } else {
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    }

}

exports.getAllChatsForUser = async function (userId) {
    const user = await User.findById(userId);
    if (!user) return { statusCode: 400, response: { success: false, message: "User is not registered." } };

    const friendList = await getFriendList(userId);
    // console.log("friendList", friendList);

    let chats = await Promise.all(friendList.map(async (friend) => {
        const lastMessage = await Message.findOne({ $or: [{ senderUser: userId, receiverUser: friend.friendId }, { senderUser: friend.friendId, receiverUser: userId }] }).sort({ createdAt: -1 });
        // console.log("lastMessage", lastMessage);

        return {
            ...friend,
            lastMessage: lastMessage ? lastMessage.content : null,
            createdAt: lastMessage ? lastMessage.createdAt : null,
            time: lastMessage ? getFormattedTime(lastMessage.createdAt) : null,
            online: false
        }

    }))
    chats = chats.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);

    return { statusCode: 200, response: { success: true, data: chats } };


}