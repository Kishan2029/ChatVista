
const User = require('../models/user.model');
const Group = require('../models/group.model');
const GroupMessage = require('../models/groupMessage.model');
const mongoose = require("mongoose");
const { getFormattedTime } = require('./chat.service');

const isPartOfGroup = exports.isPartOfGroup = (userId, groups) => {
    const isMember = groups.members.indexOf(userId);
    const isAdmin = groups.admin.indexOf(userId);
    if (isMember < 0 && isAdmin < 0) return false;
    return true;
}

exports.createGroup = async function (admin, name, members) {
    // console.log("admin", admin)
    // console.log("name", name)
    // console.log("members", members)
    const isAdmin = await User.findById(admin);
    if (!isAdmin) return { statusCode: 400, response: { success: false, message: "Admin is not registered." } };

    let membersArray = await Promise.all(members.map(async (item) => {

        const isUser = await User.findById(item);
        if (isUser) return item;
    }))

    if (membersArray.length === 0)
        return { statusCode: 400, response: { success: false, message: "Members cannot be empty." } };

    // store in database
    const newGroup = new Group({
        admin,
        members: membersArray,
        name
    })

    await newGroup.save();
    return { statusCode: 200, response: { success: true, message: "New Group is created." } };

}

exports.deleteGroup = async function (id) {

    const group = await Group.findById(id);
    if (!group) return { statusCode: 400, response: { success: false, message: "Group does not exist." } };

    await Group.deleteMany({ _id: id })
    return { statusCode: 200, response: { success: true, message: "Group is deleted." } };

}

exports.getUserGroups = async function (id) {

    const user = await User.findById(id);
    if (!user) return { statusCode: 400, response: { success: false, message: "User is not registered." } };

    let groups = await Group.find({ $or: [{ members: new mongoose.Types.ObjectId(id) }, { admin: new mongoose.Types.ObjectId(id) }] });

    groups = await Promise.all(groups.map(async (item) => {

        const lastMessage = await GroupMessage.findOne({ groupId: item._id }).sort({ createdAt: -1 });
        let senderUser = ""

        // const notification = await Notification.findOne({ receiverUser: userId, senderUser: friend.friendId })
        if (lastMessage) {
            senderUser = await User.findById(lastMessage.senderUser)

        }
        let count = 1, members = ["You"];

        await Promise.all(item.members.map(async (item) => {
            if (String(item) === String(id)) {
                return;
            }
            const user = await User.findById(item).select({ firstName: 1 });
            if (count === 3) return;
            members.push(user.firstName);
            count++;

        }))
        await Promise.all(item.admin.map(async (item) => {
            if (String(item) === String(id)) {
                return;
            }
            const user = await User.findById(item).select({ firstName: 1 });
            if (count === 3) return;
            members.push(user.firstName);
            count++;

        }))
        // Let's assume first admin is the creator of the user.
        let emptyGroupMessage = ""
        if (String(item.admin[0]) === String(id))
            emptyGroupMessage = "You created Group."
        else {
            const createdByUser = await User.findById(item.admin[0]).select({ firstName: 1 });
            emptyGroupMessage = `${createdByUser.firstName} created Group.`
        }

        return {
            ...item._doc,
            lastMessage: lastMessage ? (senderUser.firstName + ": " + lastMessage.content) : emptyGroupMessage,
            createdAt: lastMessage ? lastMessage.createdAt : item.createdAt,
            time: lastMessage ? getFormattedTime(lastMessage.createdAt) : getFormattedTime(item.createdAt),
            // senderUser: lastMessage ? senderUser.firstName : null,
            memberCount: item.admin.length + item.members.length,
            members: members
            // notificationCount: notification ? notification.count : 0
        }

    }))
    groups = groups.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
    return { statusCode: 200, response: { success: true, data: groups } };
}

exports.addMember = async function (add, userId, groupId, adminId) {

    const user = await User.findById(userId);
    if (!user) return { statusCode: 400, response: { success: false, message: "User is not registered." } };

    const groups = await Group.findById(groupId);
    if (!groups) return { statusCode: 400, response: { success: false, message: "Group does not exist." } };

    if (groups.admin.indexOf(adminId) < 0)
        return { statusCode: 400, response: { success: false, message: "Admin id is not correct" } };

    const partOfGroup = isPartOfGroup(userId, groups);

    if (add) {
        if (!partOfGroup) {
            groups.members.push(userId)
            await groups.save();
            return { statusCode: 200, response: { success: true, message: "Member is added to the group." } };
        } else {
            return { statusCode: 400, response: { success: false, message: "Member is alredy part of the group." } };
        }
    } else {
        if (!partOfGroup) {
            return { statusCode: 400, response: { success: false, message: "Member is not part of the group." } };
        } else {
            const index = groups.members.indexOf(userId);
            groups.members.splice(index, 1);
            await groups.save()
            return { statusCode: 200, response: { success: true, message: "Member is removed from the group." } };
        }
    }

}

exports.leftGroup = async function (userId, groupId) {

    const user = await User.findById(userId);
    if (!user) return { statusCode: 400, response: { success: false, message: "User is not registered." } };

    const groups = await Group.findById(groupId);
    if (!groups) return { statusCode: 400, response: { success: false, message: "Group does not exist." } };

    const partOfGroup = isPartOfGroup(userId, groups);

    if (!partOfGroup) {
        return { statusCode: 400, response: { success: false, message: "Member is not part of the group." } };
    } else {
        const index = groups.members.indexOf(userId);
        groups.members.splice(index, 1);
        await groups.save()
        return { statusCode: 200, response: { success: true, message: "Member has left from the group." } };
    }

}

exports.addAdmin = async function (add, userId, groupId, adminId) {

    const groups = await Group.findById(groupId);
    if (!groups) return { statusCode: 400, response: { success: false, message: "Group does not exist." } };

    if (groups.admin.indexOf(adminId) < 0)
        return { statusCode: 400, response: { success: false, message: "Admin id is not correct" } };

    if (add) {
        const isAdmin = groups.admin.indexOf(userId);
        if (isAdmin >= 0) return { statusCode: 400, response: { success: false, message: "User is alredy admin" } };

        const isMember = groups.members.indexOf(userId);
        if (isMember >= 0) {
            // remover member
            const index = groups.members.indexOf(userId);
            groups.members.splice(index, 1);

            // add admin
            groups.admin.push(userId)
            await groups.save()

            return { statusCode: 200, response: { success: true, message: "Member is now an admin." } };
        } else {
            return { statusCode: 400, response: { success: false, message: "Member is not part of the group." } };
        }
    } else {
        const partOfGroup = isPartOfGroup(userId, groups);
        if (!partOfGroup) return { statusCode: 400, response: { success: false, message: "User is not part of the group." } };

        const isAdmin = groups.admin.indexOf(userId);
        if (isAdmin < 0) return { statusCode: 400, response: { success: false, message: "User is already not admin." } };

        // remove from admin
        const index = groups.admin.indexOf(userId);
        groups.admin.splice(index, 1);

        // add member
        groups.members.push(userId);
        await groups.save();

        return { statusCode: 200, response: { success: true, message: "Admin is removed." } };

    }

}

exports.editGroupInfo = async function (userId, groupId, name, file) {

    const user = await User.findById(userId);
    if (!user) return { statusCode: 400, response: { success: false, message: "User is not registered." } };

    const groups = await Group.findById(groupId);
    if (!groups) return { statusCode: 400, response: { success: false, message: "Group does not exist." } };


    const partOfGroup = isPartOfGroup(userId, groups);
    if (!partOfGroup) return { statusCode: 400, response: { success: false, message: "User is not part of the group." } };

    if (file?.length > 0) {
        const profile = await cloudinary.uploader.upload(path.join('./uploads/' + file[0].filename),
            { public_id: process.env.NODE_ENV === "production" ? "chatVista_prod/profile" + file[0].filename : "chatVista_dev/profile" + file[0].filename },
            (error, result) => {

                removeFile(file[0].filename)
                if (error)
                    console.log("Image upload error")
            })
        groups.profileUrl = profile.url;
    }
    groups.name = name;

    await groups.save();
    return { statusCode: 200, response: { success: true, message: "Group profile is updated" } };

}






