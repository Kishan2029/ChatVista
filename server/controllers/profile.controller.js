const { z } = require("zod")
const ProfileService = require("../services/profile.service");


exports.getProfile = async function (req, res, next) {

    try {
        const user = z.object({
            id: z.string({ required_error: "UserId is required" }).length(24, { message: "Mongodb id should be 24 length string." }),
        });
        const { id } = user.parse(req.params);

        const { response, statusCode } = await ProfileService.getUserProfile(id);
        res.status(statusCode).send(response);
    } catch (error) {

        next(error)
    }
}

exports.updateProfile = async function (req, res, next) {

    try {
        const user = z.object({
            id: z.string({ required_error: "UserId is required" }).length(24, { message: "Mongodb id should be 24 length string." }),
            firstName: z.string({ required_error: "Firstname is required" }),
            lastName: z.string({ required_error: "Lastname is required" }),
            about: z.string().optional()
        });
        const { id, firstName, lastName, about } = user.parse(req.body);
        // console.log("body", req.body)

        const { response, statusCode } = await ProfileService.updateUserProfile(id, firstName, lastName, about);
        res.status(statusCode).send(response);
    } catch (error) {

        next(error)
    }
}