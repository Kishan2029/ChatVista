const User = require('../models/user.model');
const Request = require('../models/request.model');

const alreadyFriends = async (userA, userB) => {
    const requestAtoB = await Request.find({ senderUser: userA, receiverUser: userB, status: "accepted" });
    const requestBtoA = await Request.find({ senderUser: userB, receiverUser: userA, status: "accepted" });
    console.log
    if (requestAtoB.length > 0 || requestBtoA.length > 0) {
        return true;
    }
    return false;
}

const sentRequestExist = async (userA, userB) => {
    const sentRequest = await Request.findOne({ senderUser: userB, receiverUser: userA, status: "sent" });
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
        console.log("request", request)
        if (request.length) {
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
        const request = await Request.findOne({ senderUser: userB, receiverUser: userA, status: "sent" });
        console.log("request", request)
        request.status = "accepted"
        await request.save();

        // if userA to userB sent request exist, delete it
        await Request.deleteMany({ senderUser: userA, receiverUser: userB, status: "sent" });


        return { statusCode: 200, response: { success: true, message: "You have accepted request." } };

    } else if (status === "rejected") {
        // check if userB to userA sent request exist
        const sentRequest = await sentRequestExist(userA, userB);
        if (!sentRequest) return { statusCode: 400, response: { success: false, message: "You have not receive the request. So you cannot accept/reject it." } };

        // update request status to rejected
        const request = await Request.findOne({ senderUser: userB, receiverUser: userA, status: "sent" });
        request.status = "rejected";
        await request.save();

        return { statusCode: 200, response: { success: true, message: "You have rejected request." } };
    } else {
        return { statusCode: 403, response: { success: false, message: "Invalid status value." } };
    }


}

exports.getUserReceivedRequests = async function (userId) {
    const user = await User.findById(userId);
    if (!user) return { statusCode: 400, response: { success: false, message: "User is not registered." } };

    const requests = await Request.find({ receiverUser: userId, status: "sent" }).select({ senderUser: 1, })

    return { statusCode: 200, response: { success: true, data: requests } };

}

