const OnlineUser = require('../models/onlineUser.model');
const Notification = require('../models/notification.model');
const Group = require('../models/group.model');
const User = require('../models/user.model');


exports.addUser = async (userId, socketId) => {
    const user = await OnlineUser.find({ socketId })
    console.log("user", user)
    console.log("user.length", user.length)
    if (user.length === 0) {
        const newUser = new OnlineUser({ userId, socketId })
        await newUser.save();
        console.log("new socket saved")
    }

}

exports.removeUser = async (socketId) => {
    await OnlineUser.deleteMany({ socketId })
    console.log("socket removed")
}


// Only added socketIds for receiver
// TODO: socketIds for the other sender of the browser window
exports.sendMessage = async (data, socket) => {

    const receiverSocket = await OnlineUser.find({ userId: data.userB })


    const socketIds = receiverSocket.map((item) => {
        return item.socketId
    })

    if (socketIds.length > 0) {

        const receiverData = {
            content: data.content,
            createdBy: data.userA,
            receiverUser: data.userB
        }
        socket.to(socketIds).emit("receiveMessage", receiverData)
    }
}

// exports.isOnline = async (data, socket, io) => {
//     console.log("isOnline", socket.id, data.userId)
//     const user = await OnlineUser.find({ userId: data.userId });
//     console.log("user", user)
//     let value = false;
//     if (user.length > 0) {
//         value = true;
//     }
//     const onlineData = {
//         value,
//         id: data.userId
//     }
//     io.to(socket.id).emit("fetchOnlineStatus", onlineData)
//     // socket.broadcast.emit("fetchOnlineStatus", value)

// }

exports.sendOnlineStatus = async (socket, io) => {


    const socketIds = await OnlineUser.find();
    const userIds = socketIds.map((item) => {
        return item.userId
    })


    // io.to(socket.id).emit("fetchOnlineStatus", onlineData)
    socket.broadcast.emit("fetchOnlineStatus", userIds)

}

exports.userTyping = async (data, socket) => {

    const receiverSocket = await OnlineUser.find({ userId: data.userB })


    const socketIds = receiverSocket.map((item) => {
        return item.socketId
    })

    if (socketIds.length > 0) {

        const receiverData = {
            senderUser: data.userA,
            receiverUser: data.userB
        }
        // console.log("hello")
        socket.to(socketIds).emit("fetchUserTyping", receiverData)
    }
}

exports.sendNotification = async (data, socket) => {
    console.log("Inside sendNotification socket", data)

    // update the count
    const notification = await Notification.find({
        senderUser: data.userA,
        receiverUser: data.userB,
    })

    const count = notification.length ? notification[0].count + 1 : 1;
    await Notification.findOneAndUpdate({
        senderUser: data.userA,
        receiverUser: data.userB,
    }, {
        senderUser: data.userA,
        receiverUser: data.userB,
        count: count
    }, {
        new: true,
        upsert: true
    })


    // send notification to receiver
    const receiverSocket = await OnlineUser.find({ userId: data.userB })


    const socketIds = receiverSocket.map((item) => {
        return item.socketId
    })

    if (socketIds.length > 0) {

        const receiverData = {
            count,
            createdBy: data.userA,
            receiverUser: data.userB
        }
        socket.to(socketIds).emit("receiveNotification", receiverData)
    }
}

exports.makeNotificationCountZero = async (data, socket) => {
    console.log("Inside makeNotificationCountZero socket", data)

    // make count 0
    await Notification.findOneAndUpdate({
        senderUser: data.userA,
        receiverUser: data.userB,
    }, {
        senderUser: data.userA,
        receiverUser: data.userB,
        count: 0
    }, {
        new: true,
        upsert: true
    })
}


// Added socketIds for both sender and receiver
exports.sendGroupMessage = async (data, socket) => {
    console.log("data", data)
    const group = await Group.findById(data.groupId);

    let userArray = group.admin.concat(group.members);
    const userId = data.userId;

    // userArray = userArray.map((item) => {
    //     if (String(item) === userId) return;
    //     return item;
    // })
    // console.log("userArray", userArray)

    const receiverSocket = await OnlineUser.find({ userId: { $in: userArray } })



    let socketIds = receiverSocket.map((item) => {
        if (data.socketId !== item.socketId)
            return item.socketId
    })
    // const index = socketIds.indexOf(data.socketId)
    // if (index > -1) {
    //     socketIds = socketIds.splice(index, 1)
    // }
    console.log("socketIds", socketIds)

    if (socketIds.length > 0) {
        const user = await User.findById(userId);

        const receiverData = {
            content: data.content,
            createdBy: data.userId,
            groupId: data.groupId,
            createdByUser: user.firstName + " " + user.lastName
        }
        socket.to(socketIds).emit("receiveGroupMessage", receiverData)
    }
}

exports.groupCreated = async (data, socket) => {
    console.log("data", data)
    let members = data.members.concat(data.admin);
    const receiverSocket = await OnlineUser.find({ userId: { $in: members } });
    console.log("receiverSocket", receiverSocket)

    let socketIds = receiverSocket.map((item) => {
        if (data.socketId !== item.socketId)
            return item.socketId
    })

    if (socketIds.length > 0) {
        // const user = await User.findById(userId);

        const receiverData = {
            members,
            groupName: data.name,
            createdBy: data.createdBy,
            admin: data.admin
        }
        socket.to(socketIds).emit("receiveGroupCreated", receiverData)
    }
}
