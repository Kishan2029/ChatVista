const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: process.env.NODE_ENV === "production" ? ".env" : ".env.dev" });
const PORT = process.env.PORT || 6000;
const cors = require("cors");
const bodyParser = require('body-parser');
const route = require("./routes/routes");
const socket = require("./sockets/index")
const { logger, errorHandler } = require('./middleware/index');
const { Server } = require("socket.io");
const connectDB = require('./config/db');

// Cors Setup
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, 'uploads')));
connectDB();



app.get('/', (req, res) => {
    res.send('Server is running')
})



app.use(logger);

// app.use(checkAuth);

route(app);

app.use(errorHandler);

const server = app.listen(PORT, () => {
    console.log(`[listen] Server listening on ${PORT}`);
});

// socket connection
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

socket(io)






