const User = require('../models/user.model');
const Request = require('../models/request.model')


const getFriendList = async (userId) => {
    const requests = await Request.find({ $or: [{ senderUser: userId, status: "accepted" }, { receiverUser: userId, status: "accepted" }] });
    return requests;
}

const getAllUsers = async () => {
    const users = await User.find();
    return users;
}

// explore users = allUsers - friends
const exploredUsers = async (allUsers, friendList) => {

    const idsToRemove = friendList.reduce((ids, item) => {
        ids.push(String(item.senderUser), String(item.receiverUser));
        return ids;
    }, []);

    const list = allUsers.filter(item => !idsToRemove.includes(String(item._id)))

    return list;

}


exports.getUserFriends = async function (userId) {
    const user = await User.findById(userId);
    if (!user) return { statusCode: 400, response: { success: false, message: "User is not registered." } };
    const friends = await getFriendList(userId);
    return { statusCode: 200, response: { success: true, data: friends } };
}

exports.getExploreUsers = async function (userId) {

    const user = await User.findById(userId);
    if (!user) return { statusCode: 400, response: { success: false, message: "User is not registered." } };

    const allUsers = await getAllUsers();
    const friendList = await getFriendList(userId);
    const exploreUsers = await exploredUsers(allUsers, friendList);

    return { statusCode: 200, response: { success: true, data: exploreUsers } };
}

