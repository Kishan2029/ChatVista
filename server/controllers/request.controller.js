const { z } = require("zod")
const RequestService = require("../services/request.service");
const { ObjectId } = require("mongodb");
exports.sentRequest = async function (req, res, next) {

    try {
        const user = z.object({
            userA: z.string({ required_error: "UserId is required" }),
            userB: z.string({ required_error: "UserId is required" }),
            // userA: z.instanceof(ObjectId),
            // userB: z.instanceof(ObjectId),
            status: z.enum(['accepted', 'rejected', 'sent'])
        });
        const { userA, userB, status } = user.parse(req.body);

        const { response, statusCode } = await RequestService.sentRequest(userA, userB, status);
        res.status(statusCode).send(response);
    } catch (error) {

        next(error)
    }
}

exports.getUserReceivedRequests = async function (req, res, next) {

    try {
        const user = z.object({
            id: z.string({ required_error: "UserId is required" }),
        });
        const { id } = user.parse(req.params);

        const { response, statusCode } = await RequestService.getUserReceivedRequests(id);
        res.status(statusCode).send(response);
    } catch (error) {

        next(error)
    }
}