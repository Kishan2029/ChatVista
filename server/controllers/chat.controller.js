const { z } = require("zod")
const ChatService = require("../services/chat.service")
exports.getAllChats = async function (req, res, next) {
    try {
        const user = z.object({
            id: z.string({ required_error: "UserId is required" }),
        });
        const { id } = user.parse(req.params);

        const { response, statusCode } = await ChatService.getAllChatsForUser(id);
        res.status(statusCode).send(response);
    } catch (error) {

        next(error)
    }
}