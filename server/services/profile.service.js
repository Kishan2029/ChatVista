
const User = require('../models/user.model');


exports.getUserProfile = async function (userId) {
    const user = await User.findById(userId).select({ email: 1, firstName: 1, lastName: 1, about: 1 });
    if (!user) return { statusCode: 400, response: { success: false, message: "User is not registered." } };

    return { statusCode: 200, response: { success: true, data: user } };
}

exports.updateUserProfile = async function (userId, firstName, lastName, about) {
    const user = await User.findById(userId).select({ email: 1, firstName: 1, lastName: 1, about: 1 });
    if (!user) return { statusCode: 400, response: { success: false, message: "User is not registered." } };
    const updatedUser = await User.findByIdAndUpdate(userId, {
        firstName, lastName, about
    }, {
        new: true,
        upsert: true
    })
    return { statusCode: 200, response: { success: true, data: updatedUser } };
}



