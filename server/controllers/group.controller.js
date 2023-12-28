
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

// TODO: should add adminId for checking only admin can delete group
exports.deleteGroup = async function (req, res, next) {
    try {
        const group = z.object({
            id: z.string({ required_error: "UserId is required" })

        });

        const { id } = group.parse(req.params);

        const { response, statusCode } = await GroupService.deleteGroup(id);
        res.status(statusCode).send(response);
    } catch (error) {
        // console.log("first", error)
        next(error)
    }
}

exports.getGroup = async function (req, res, next) {
    try {
        const group = z.object({
            id: z.string({ required_error: "UserId is required" })

        });

        const { id } = group.parse(req.params);

        const { response, statusCode } = await GroupService.getUserGroups(id);
        res.status(statusCode).send(response);
    } catch (error) {
        // console.log("first", error)
        next(error)
    }
}

exports.addMember = async function (req, res, next) {
    try {
        const group = z.object({
            add: z.boolean({ required_error: "Add boolean is required" }),
            userId: z.string({ required_error: "UserId is required" }),
            groupId: z.string({ required_error: "GroupId is required" }),
            adminId: z.string({ required_error: "AdminId is required" }),
        });

        const { add, userId, groupId, adminId } = group.parse(req.body);

        const { response, statusCode } = await GroupService.addMember(add, userId, groupId, adminId);
        res.status(statusCode).send(response);
    } catch (error) {

        next(error)
    }
}

exports.leftGroup = async function (req, res, next) {
    try {
        const group = z.object({
            userId: z.string({ required_error: "UserId is required" }),
            groupId: z.string({ required_error: "GroupId is required" }),
        });

        const { userId, groupId } = group.parse(req.body);

        const { response, statusCode } = await GroupService.leftGroup(userId, groupId);
        res.status(statusCode).send(response);
    } catch (error) {

        next(error)
    }
}

exports.addAdmin = async function (req, res, next) {
    try {
        const group = z.object({
            add: z.boolean({ required_error: "Add boolean is required" }),
            userId: z.string({ required_error: "UserId is required" }),
            groupId: z.string({ required_error: "GroupId is required" }),
            adminId: z.string({ required_error: "AdminId is required" }),
        });

        const { add, userId, groupId, adminId } = group.parse(req.body);

        const { response, statusCode } = await GroupService.addAdmin(add, userId, groupId, adminId);
        res.status(statusCode).send(response);
    } catch (error) {

        next(error)
    }
}

exports.editInfo = async function (req, res, next) {
    try {
        const group = z.object({
            userId: z.string({ required_error: "UserId is required" }),
            groupId: z.string({ required_error: "GroupId is required" }),
            name: z.string({ required_error: "Group name is required" }),
        });

        const { userId, groupId, name } = group.parse(req.body);

        const { response, statusCode } = await GroupService.editGroupInfo(userId, groupId, name, req.files);
        res.status(statusCode).send(response);
    } catch (error) {

        next(error)
    }
}






