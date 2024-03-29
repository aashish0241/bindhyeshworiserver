const express = require("express");
const path = require("path");
const userRoute = require("./route/userRoute");
const eventRoute = require("./route/eventRoute");
const contactRoute = require("./route/contactRoute");
const teacherRoute = require("./route/teacherRoute");
const studyRoute = require("./route/studyRoute");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middleware/middleware");
const cron = require("node-cron");
const axios = require("axios"); // Import Axios

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log("Connected to the database successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/api/users", userRoute);
app.use("/api/event", eventRoute);
app.use("/api/contact", contactRoute);
app.use("/api/teacher", teacherRoute);
app.use("/api/study", studyRoute);

// Move the errorHandler middleware after setting up routes
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Get user successfully");
});

// Schedule a job to make a request to the server every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  try {
    // Make a GET request to your own server
    const response = await axios.get("https://bindhyehworiserver.onrender.com/");
    console.log("Ping server to prevent sleeping", response.data);
  } catch (error) {
    console.error("Error pinging server:", error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
