const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require("path");
// const route = require("./routes/routes");
// const { errorHandler, logger, checkAuth } = require('./middleware/index');

// const connectDB = require('./config/db');

// Cors Setup
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 6000;


// connectDB();

app.get('/', (req, res) => {
    res.send('Server is working')
})


// app.use(logger);

// app.use(checkAuth);

// route(app);

// app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`[listen] Server listening on ${PORT}`);
});


