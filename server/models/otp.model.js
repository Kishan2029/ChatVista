// models/otpModel.js
const mongoose = require('mongoose');
const { mailSender } = require('../util/mailSender');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    },
});

async function sendVerificationEmail(email, otp, name) {
    try {
        const mailResponse = await mailSender(
            email,
            "Welcome to ChatVista! Just One Step Away...",
            `Hello ${name},</br>
            <p>Excited to have you join the ChatVista community! You're almost ready to connect and chat with everyone. Just confirm your email address with the quick OTP below:</p></br>
            <p><b>OTP</b>: ${otp}</p></br>
            <p>This code is valid for 5 minutes. Enter it on the ChatVista website to unlock your new messaging adventure!</p></br>
            <p>If you didn't request this verification, please ignore this email.</p></br>
            <p>See you in the chat,</p></br>
            <p>The ChatVista Team</p>
            `
        );

    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
}
otpSchema.pre("save", async function (next) {
    console.log("New otp document saved to the database");
    // Only send an email when a new document is created
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp, this.firstName + " " + this.lastName);
    }
    next();
});
module.exports = mongoose.model("OTP", otpSchema);