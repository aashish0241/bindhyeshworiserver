const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    address: {
      type: String,
      required: [true, "Please add a password"],
    },
    message: {
      type: String,
      required: [true],
    },
    subject: {
      type: String,
      required: [true],
    },
    phone: {
      type: String,
      // required: [true],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving to DB (removed bcrypt code)

const Contact = mongoose.model("contact", contactSchema);
module.exports = Contact;
