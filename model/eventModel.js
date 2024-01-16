const mongoose = require("mongoose");

// Function to format the date as "year-month-day"
function formatDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      // required: [true, "Please add a name"],
    },
    file: {
      type: String,
    },
    description: {
      type: String,
      // required: [true, "Please add a password"],
    },
    date: {
      type: String,
      default: formatDate,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving to DB (removed bcrypt code)

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
