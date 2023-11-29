const OnlineUser = require('../models/onlineUser.model');

exports.addUser = async (userId, socketId) => {
    const newUser = new OnlineUser({ userId, socketId })
    await newUser.save();
    console.log("new socket saved")
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