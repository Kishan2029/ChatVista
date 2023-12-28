
const { z } = require("zod");
const GroupMessageService = require("../services/groupMessage.service");

exports.createMessage = async function (req, res, next) {
    try {
        const groupMessage = z.object({
            userId: z.string({ required_error: "UserId is required" }),
            groupId: z.string({ required_error: "UserId is required" }),
            // status: z.enum(['sent', 'received', 'seen']),
            content: z.string({ required_error: "Content is required" }),

        });
        const { userId, groupId, content } = groupMessage.parse(req.body);

        const { response, statusCode } = await GroupMessageService.createMessage(userId, groupId, content);
        res.status(statusCode).send(response);
    } catch (error) {

        next(error)
    }
}


exports.getMessage = async function (req, res, next) {
    try {
        const groupMessage = z.object({
            userId: z.string({ required_error: "UserId is required" }),
            groupId: z.string({ required_error: "UserId is required" }),
        });
        const { userId, groupId } = groupMessage.parse(req.body);

        const { response, statusCode } = await GroupMessageService.getMessage(userId, groupId);
        res.status(statusCode).send(response);
    } catch (error) {

        next(error)
    }
}


