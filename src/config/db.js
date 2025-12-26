const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🔍 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB error:", error.message);
    process.exit(1); // exit ONLY on error
  }
};

module.exports = connectDB;
