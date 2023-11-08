const { z } = require("zod")
const UserService = require("../services/user.service");


exports.getFriends = async function (req, res, next) {

    try {
        const user = z.object({
            id: z.string({ required_error: "UserId is required" }).length(24, { message: "Mongodb id should be 24 length string." }),
        });
        const { id } = user.parse(req.params);

        const { response, statusCode } = await UserService.getUserFriends(id);
        res.status(statusCode).send(response);
    } catch (error) {

        next(error)
    }
}

exports.getExploreUsers = async function (req, res, next) {

    try {
        const user = z.object({
            id: z.string({ required_error: "UserId is required" }).length(24, { message: "Mongodb id should be 24 length string." }),
        });
        const { id } = user.parse(req.params);

        const { response, statusCode } = await UserService.getExploreUsers(id);
        res.status(statusCode).send(response);
    } catch (error) {

        next(error)
    }
}