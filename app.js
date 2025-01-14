const express = require("express");
const morgan = require("morgan");
const logger = require("./middlewares/logger");
// const connectDB = require("./config/db");
const connectDB = require("./config/db");

const taskRoutes = require("./routes/task");
const studentRoute = require("./routes/studentRoute");
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(morgan("dev"));
app.use(logger);

// Database connection

connectDB();

// Routes

app.use("/api/tasks", taskRoutes);
app.use("/api/students", studentRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
