// Express configuration
const express = require("express");
const app = express();
const port = 8000;

// Add your dependencies here
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Import your routes here
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

dotenv.config();

// connection to MongoDB
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, () => {
    console.log("Connected to MongoDB");
})

// console.log(process.env.MONGO_URL);

// middleware 
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


// Use your routes here
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

// Starting the Express server
app.listen(port, () => {
    console.log("Backend server is running");
});