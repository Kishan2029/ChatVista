const OnlineUser = require('../models/onlineUser.model');

exports.addUser = async (userId, socketId) => {
    const user = await OnlineUser.find({ socketId })
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

exports.sendMessage = async (data, socket) => {
    console.log("data", data.userB)
    const receiverSocket = await OnlineUser.find({ userId: data.userB })
    console.log("receiverSocket", receiverSocket);

    const socketIds = receiverSocket.map((item) => {
        return item.socketId
    })
    console.log("socketIds", socketIds)
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
        console.log("hello")
        socket.to(socketIds).emit("fetchUserTyping", receiverData)
    }
}