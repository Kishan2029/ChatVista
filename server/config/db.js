
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

console.log("process.env.MONGODB_URL", process.env.MONGODB_URL)
const connectDB = async () => {
    try {
        mongoose.connect(
            process.env.MONGODB_URL
        );
        console.log("ChatVista Database Connected....");
    } catch (err) {
        console.error(err.message);
        // Exit Process with failure
        process.exit(1);
    }

}

module.exports = connectDB;
