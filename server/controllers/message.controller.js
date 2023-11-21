
const { z } = require("zod");
const MessageService = require("../services/message.service");

exports.getMessage = async function (req, res, next) {
    try {
        const message = z.object({
            userA: z.string({ required_error: "UserId is required" }),
            userB: z.string({ required_error: "UserId is required" }),
        });
        const { userA, userB } = message.parse(req.body);

        const { response, statusCode } = await MessageService.getMessage(userA, userB);
        res.status(statusCode).send(response);
    } catch (error) {

        next(error)
    }
}

exports.createMessage = async function (req, res, next) {
    try {
        const message = z.object({
            userA: z.string({ required_error: "UserId is required" }),
            userB: z.string({ required_error: "UserId is required" }),
            // status: z.enum(['sent', 'received', 'seen']),
            content: z.string({ required_error: "Content is required" }),

        });
        const { userA, userB, content } = message.parse(req.body);

        const { response, statusCode } = await MessageService.createMessage(userA, userB, content);
        res.status(statusCode).send(response);
    } catch (error) {

        next(error)
    }
}

