require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

console.log("🚀 Starting server...");

connectDB(); // connect to MongoDB

const PORT = process.env.PORT || 3200;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
