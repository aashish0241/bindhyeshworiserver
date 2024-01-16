const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema(
  {
    name: {
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
    position: {
      type: String,
    },
    subject: {
      type: String,
      require,
    },
    phone: {
      type: String,
      require,
    },

    date: {
      type: String,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving to DB (removed bcrypt code)

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
