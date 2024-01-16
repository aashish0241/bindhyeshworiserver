const express = require("express");
const multer = require("multer");
const {
  addEvent,
  getEvents,
  deleteEvent,
} = require("../controller/eventController");
const { adminOnly } = require("../middleware/adminhandle");

const router = express.Router();

// Configure Multer for file upload with temporary storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to add an event
router.post("/add", upload.single("file"), addEvent);
router.get("/event", getEvents);
router.delete("/delete/:id",  deleteEvent);

module.exports = router;
