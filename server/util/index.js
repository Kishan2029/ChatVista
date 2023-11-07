// utils/mailSender.js
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();
const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            //   host: process.env.MAIL_HOST,
            service: 'gmail',
            auth: {
                user: process.env.USERNAME,
                pass: process.env.PASS
            }
        });

        const info = await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: title,
            html: body,
        })
        return info;

    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
};
module.exports = { mailSender };