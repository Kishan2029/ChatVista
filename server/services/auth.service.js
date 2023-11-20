const User = require('../models/user.model');
const OTP = require('../models/otp.model');
const bcrypt = require('bcrypt');

const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
}

const generateHashedPassword = async (password) => {
    const data = await bcrypt.hash(password, 10);
    console.log("data", data);
    return data;
}



exports.registerUser = async function (firstName, lastName, email, password) {


    const user = await User.findOne({ email: email });
    if (user) return { statusCode: 409, response: { success: false, message: "User already exist" } };

    // Before otp generation, delete pervious otps
    await OTP.deleteMany({ email: email });
    const newOtp = new OTP({ email, otp: generateOTP() })
    await newOtp.save();

    // check if otp is generated
    const findOTP = await OTP.findOne({ email });
    if (!findOTP) return { statusCode: 400, response: { success: false, message: "Otp is not generated" } };



    return { statusCode: 200, response: { success: true, message: "Otp is generated" } };

}

exports.verifyUser = async function (firstName, lastName, email, password, otp) {


    const user = await User.findOne({ email: email });
    if (user) return { statusCode: 400, response: { success: false, message: "User is alredy registered." } };


    const { otp: generatedOtp } = await OTP.findOne({ email });
    if (!generatedOtp) return { statusCode: 400, response: { success: false, message: "Otp is not generated." } };
    console.log("generatedOtp", generatedOtp)
    if (otp === generatedOtp) {
        // save the user
        // bcrypt.hash(password, 10, async function (err, hash) {
        //     // Store hash in your password DB.
        //     const newUser = new User({ firstName, lastName, email, password: hash })
        //     await newUser.save();
        //     return { statusCode: 400, response: { success: true, message: "New user is registered." } };

        // });
        const hashedPassword = await generateHashedPassword(password);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword })
        await newUser.save();
        return { statusCode: 200, response: { success: true, message: "New user is registered." } };


    } else {
        return { statusCode: 400, response: { success: true, message: "Otp is not correct." } };
    }



}

exports.loginUser = async function (email, password) {
    const user = await User.findOne({ email: email });
    if (!user) return { statusCode: 400, response: { success: false, message: "User is not registered." } };

    const match = await bcrypt.compare(password, user.password);
    if (match) {
        return { statusCode: 200, response: { success: true, message: "Login successful", data: { userId: user.id } } };
    } else {
        return { statusCode: 400, response: { success: true, message: "Password does not match" } };
    }

}