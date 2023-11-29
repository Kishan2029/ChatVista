const { addUser, removeUser, sendMessage } = require("./functions");



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
    });
};