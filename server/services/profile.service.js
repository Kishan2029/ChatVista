
const User = require('../models/user.model');
const fs = require('fs')
const path = require('path')

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'do9w4fypf',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const removeFile = exports.removeFile = (filename) => {
    // Use fs.unlinkSync to delete the file synchronously
    const filePath = path.join('./uploads/' + filename)
    try {
        fs.unlinkSync(filePath);
        console.log('File successfully deleted!');
    } catch (err) {
        console.error('Error deleting the file:', err);
    }
}

exports.getUserProfile = async function (userId) {
    const user = await User.findById(userId).select({ email: 1, firstName: 1, lastName: 1, about: 1, profileUrl: 1 });
    if (!user) return { statusCode: 400, response: { success: false, message: "User is not registered." } };

    return { statusCode: 200, response: { success: true, data: user } };
}

exports.updateUserProfile = async function (userId, firstName, lastName, about, file) {
    const user = await User.findById(userId).select({ email: 1, firstName: 1, lastName: 1, about: 1 });
    if (!user) return { statusCode: 400, response: { success: false, message: "User is not registered." } };


    if (file.length > 0) {
        const profile = await cloudinary.uploader.upload(path.join('./uploads/' + file[0].filename),
            { public_id: process.env.NODE_ENV === "production" ? "chatVista_prod/profile" + file[0].filename : "chatVista_dev/profile" + file[0].filename },
            (error, result) => {

                removeFile(file[0].filename)
                if (error)
                    console.log("Image upload error")
            })
        user.profileUrl = profile.url;
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.about = about;
    await user.save();


    // const updatedUser = await User.findByIdAndUpdate(userId, {
    //     firstName, lastName, about, profileUrl: images
    // }, {
    //     new: true,
    //     upsert: true
    // })
    return { statusCode: 200, response: { success: true, message: "Profile is updated" } };
}



