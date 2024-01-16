const asyncHandler = require("express-async-handler");
const Contact = require("../model/contactModel");

// Post a message
const postMessage = asyncHandler(async (req, res) => {
  const { name, email, address, message, subject } = req.body;

  // Validation of request
  if (!name || !email) {
    res.status(400).json({ error: "Please fill in all the required fields" });
    return;
  }

  // Check if email exists (you need to implement this logic based on your requirements)

  // Create message
  const newContact = await Contact.create({
    name,
    email,
    address,
    message,
    subject,
  });

  // Respond with the newly created message
  res.status(201).json({
    message: "Message posted successfully",
    messageDetails: newContact,
  });
});

const getContact = async (req, res) => {
  try {
    const events = await Contact.find();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// Delete the user (Logout)
const deletePost = async (req, res) => {
  try {
    const eventId = req.params.id;

    // Check if the event exists
    const existingPost = await Contact.findById(eventId);
    if (!existingPost) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Delete the event from Cloudinary
    //     await cloudinary.uploader.destroy(existingEvent.file_id);

    // Delete the event from the database
    //     await existingEvent.remove();
    await existingPost.deleteOne();

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  postMessage,
  getContact,
  deletePost
};
