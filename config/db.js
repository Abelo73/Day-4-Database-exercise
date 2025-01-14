const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://abel:password@localhost:27017/task_manager",
      {
        // These options are no longer necessary in Mongoose 6+
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected successfully...");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit the application on failure
  }
};

module.exports = connectDB;
