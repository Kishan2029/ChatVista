
const User = require('../models/user.model');
const Group = require('../models/group.model');
const mongoose = require("mongoose");


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

    const groups = await Group.find({ members: new mongoose.Types.ObjectId(id) })
    return { statusCode: 200, response: { success: true, data: groups } };
}

exports.addMember = async function (add, userId, groupId) {

    const user = await User.findById(userId);
    if (!user) return { statusCode: 400, response: { success: false, message: "User is not registered." } };

    const groups = await Group.findById(groupId);

    const isMember = groups.members.indexOf(userId);
    console.log("isMember", isMember)
    if (add) {
        if (isMember < 0) {
            groups.members.push(userId)
            await groups.save();
            return { statusCode: 200, response: { success: true, message: "Member is added to the group." } };
        } else {
            return { statusCode: 400, response: { success: false, message: "Member is alredy part of the group." } };
        }
    } else {
        if (isMember < 0) {
            return { statusCode: 400, response: { success: false, message: "Member is not part of the group." } };
        } else {
            const index = groups.members.indexOf(userId);
            groups.members.splice(index, 1);
            await groups.save()
            return { statusCode: 200, response: { success: true, message: "Member is removed from the group." } };
        }
    }

}





