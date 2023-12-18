
const { z } = require("zod");
const GroupService = require("../services/group.service");

exports.createGroup = async function (req, res, next) {


    try {
        const group = z.object({
            admin: z.string({ required_error: "UserId is required" }),
            name: z.string({ required_error: "Group name is required" }),
            members: z.array(z.string({ required_error: "UserId is required" })).nonempty()
        });
        const { admin, name, members } = group.parse(req.body);

        // console.log("admin", admin)
        // console.log("name", name)
        // console.log("members", members)
        const { response, statusCode } = await GroupService.createGroup(admin, name, members);
        res.status(statusCode).send(response);
    } catch (error) {
        // console.log("first", error)
        next(error)
    }
}

