
const User = require('../models/user.model');
const Group = require('../models/group.model');


exports.createGroup = async function (admin, name, members) {
    // console.log("admin", admin)
    // console.log("name", name)
    // console.log("members", members)
    const isAdmin = await User.findById(admin);
    if (!isAdmin) return { statusCode: 400, response: { success: false, message: "Admin is not registered." } };

    let membersArray = await Promise.all(members.map(async (item) => {
        console.log("item", item)
        const isUser = await User.findById(item);
        if (isUser) return item;
    }))
    console.log("membersArray", membersArray)
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