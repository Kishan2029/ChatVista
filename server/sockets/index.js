const { addUser, removeUser, sendMessage, updateGroupInfo, groupMemberAdded, userLeaveGroup, sendOnlineStatus, userTyping, sendNotification, sendGroupNotification, makeNotificationCountZero, sendGroupMessage, groupCreated } = require("./functions");



module.exports = (io) => {
    io.on("connection", (socket) => {

        console.log("User Connected:", socket.id)
        socket.on("disconnect", () => {
            removeUser(socket.id);
        });

        socket.on("addUser", (data) => {
            addUser(data.userId, socket.id);

        })
        socket.on('sendMessage', (data) => {
            sendMessage(data, socket)
        });

        socket.on('sendNotification', (data) => {
            sendNotification(data, socket)
        });

        socket.on('sendGroupNotification', (data) => {
            sendGroupNotification(data, socket)
        });

        socket.on('makeNotificationCountZero', (data) => {
            makeNotificationCountZero(data, socket)
        })

        socket.on('groupCreated', (data) => {
            groupCreated(data, socket)
        })

        socket.on('userTyping', (data) => [
            userTyping(data, socket)
        ]);

        socket.on('sendGroupMessage', (data) => {
            sendGroupMessage(data, socket)
        });

        socket.on('groupMemberAdded', (data) => {
            groupMemberAdded(data, socket)
        });

        socket.on('userLeaveGroup', (data) => {
            userLeaveGroup(data, socket)
        });

        socket.on('updateGroupInfo', (data) => {
            updateGroupInfo(data, socket)
        });

        setInterval(() => {
            sendOnlineStatus(socket)
        }, 2 * 1000)


        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

    });
};