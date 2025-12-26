require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

// Connect DB ONCE (serverless-safe)
connectDB();

module.exports = app;
