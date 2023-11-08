const User = require('../models/user.model');
const Request = require('../models/request.model')

const alreadyFriends = async (userA, userB) => {
    const requestAtoB = await Request.find({ senderUser: userA, receiverUser: userB, status: "accepted" });
    const requestBtoA = await Request.find({ senderUser: userB, receiverUser: userA, status: "accepted" });
    if (requestAtoB.length > 0 || requestBtoA.length > 0) {
        return true;
    }
    return false;
}

const sentRequestExist = async (userA, userB) => {
    const sentRequest = await Request.find({ senderUser: userB, receiverUser: userA, status: "sent" });
    if (sentRequest) return true;
    return false;
}

exports.sentRequest = async function (userA, userB, status) {

    const userAExist = await User.findById(userA);
    if (!userAExist) return { statusCode: 400, response: { success: false, message: "UserA is not registered." } };

    const userBExist = await User.findById(userB);
    if (!userBExist) return { statusCode: 400, response: { success: false, message: "UserB is not registered." } };


    if (status === "sent") {
        // check wheather alreay friends
        const friends = await alreadyFriends(userA, userB);
        if (friends) {
            return { statusCode: 400, response: { success: false, message: "You are alredy friends." } };
        }

        // already sent a request
        const request = await Request.find({ senderUser: userA, receiverUser: userB, status: "sent" });
        if (request) {
            return { statusCode: 400, response: { success: false, message: "You already sent a request." } };
        }

        // store in database
        const newRequest = new Request({
            senderUser: userA, receiverUser: userB, status: "sent"
        })

        await newRequest.save();
        return { statusCode: 200, response: { success: true, message: "You have sent the request." } };

    } else if (status === "accepted") {

        // check if userB to userA sent request exist
        const sentRequest = await sentRequestExist(userA, userB);
        if (!sentRequest) return { statusCode: 400, response: { success: false, message: "You have not receive the request. So you cannot accept/reject it." } };

        // update request status to accepted
        sentRequest.status = "accepted";
        await sentRequest.save();

        return { statusCode: 200, response: { success: true, message: "You have accepted request." } };

    } else if (status === "rejected") {
        // check if userB to userA sent request exist
        const sentRequest = await sentRequestExist(userA, userB);
        if (!sentRequest) return { statusCode: 400, response: { success: false, message: "You have not receive the request. So you cannot accept/reject it." } };

        // update request status to rejected
        sentRequest.status = "rejected";
        await sentRequest.save();

        return { statusCode: 200, response: { success: true, message: "You have rejected request." } };
    } else {
        return { statusCode: 403, response: { success: false, message: "Invalid status value." } };
    }


}