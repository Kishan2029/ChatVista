const { addUser, removeUser, sendMessage, sendOnlineStatus, userTyping, sendNotification, makeNotificationCountZero } = require("./functions");



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

        socket.on('makeNotificationCountZero', (data) => {
            makeNotificationCountZero(data, socket)
        })

        // socket.on('isOnline', (data) => {
        //     isOnline(data, socket, io)
        // });

        socket.on('userTyping', (data) => [
            userTyping(data, socket)
        ]);



        setInterval(() => {
            sendOnlineStatus(socket)
        }, 2 * 1000)



        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

    });
};