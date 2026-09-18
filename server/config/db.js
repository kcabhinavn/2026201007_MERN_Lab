const mongoose = require("mongoose");

// Default connection string points at a local MongoDB daemon.
// No non-standard ports or secret keys are required.
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/notes_db";

const connectDB = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log(`[db] Connected to MongoDB at ${MONGO_URI}`);
    })
    .catch((err) => {
      console.error("[db] MongoDB connection error:", err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
