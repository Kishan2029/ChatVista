const User = require('../models/user.model');
const OTP = require('../models/otp.model');

const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
}


exports.registerUser = async function (firstName, lastName, email, password) {


    // const user = await User.findOne({ email: email });
    // if (user) return { statusCode: 200, response: { success: false, message: "User already exist" } };


    const newOtp = new OTP({ email, otp: generateOTP() })
    await newOtp.save();


    // const newUser = new User({ firstName, lastName, email, password })
    // await newUser.save();
    return { statusCode: 200, response: { success: true, message: "New user registered" } };

}