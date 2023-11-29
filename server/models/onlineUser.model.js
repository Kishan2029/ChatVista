const mongoose = require("mongoose");

const OnlineUserSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
        trim: true
    },
    socketId: {
        type: String,
        required: true,
        trim: true
    }

});

const OnlineUser = mongoose.model("OnlineUser", OnlineUserSchema);

module.exports = OnlineUser;