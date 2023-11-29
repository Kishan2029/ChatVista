const User = require('../models/user.model');
const Request = require('../models/request.model')


const getFriendList = exports.getFriendList = async (userId) => {
    let requests = await Request.find({ $or: [{ senderUser: userId, status: "accepted" }, { receiverUser: userId, status: "accepted" }] });
    requests = await Promise.all(requests.map(async (item) => {
        const userID = String(item.senderUser) === String(userId) ? item.receiverUser : item.senderUser;
        const userInfo = await User.findById(userID);
        return {
            friendId: userID,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName
        }
    }))
    return requests;
}

const getAllUsers = async () => {
    const users = await User.find();
    return users;
}

// explore users = allUsers - friends
const exploredUsers = async (allUsers, friendList, userId) => {

    const idsToRemove = friendList.reduce((ids, item) => {
        ids.push(String(item.friendId));
        return ids;
    }, []);
    idsToRemove.push(String(userId));
    let list = allUsers.filter(item => !idsToRemove.includes(String(item._id)));

    // requests from a to anyUser
    const requests = await Request.find({ senderUser: userId, status: "sent" });

    list = list.map((user) => {
        let sent = false
        if (requests.find((req) => String(req.receiverUser) === String(user._id))) {
            sent = true;
        }
        return {
            ...user._doc,
            sent: sent
        }
    })

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
    const exploreUsers = await exploredUsers(allUsers, friendList, userId);

    return { statusCode: 200, response: { success: true, data: exploreUsers } };
}

