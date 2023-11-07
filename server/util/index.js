// utils/mailSender.js
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();
const mailSender = async (email, title, body) => {
    try {
        // Create a Transporter to send emails
        console.log("env", process.env.USERNAME, process.env.PASS)
        let transporter = nodemailer.createTransport({
            //   host: process.env.MAIL_HOST,
            service: 'gmail',
            auth: {
                user: process.env.USERNAME,
                pass: process.env.PASS
                // user: "chatvista911@gmail.com",
                // pass: "opgjptwcnsinxjac",

            }
        });
        // Send emails to users
        transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: title,
            html: body,
        }, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });


    } catch (error) {
        console.log(error.message);
    }
};
module.exports = { mailSender };