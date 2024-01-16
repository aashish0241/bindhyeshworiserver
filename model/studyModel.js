const mongoose = require("mongoose");

const studySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    topic:{
                  type: String
    },
    link:{
                  type: String
    },
    class:{
      type:String
    },
    description: {
      type: String,
    },
    file:{
                  type: String,
    }
  },
  {
    timestamps: true,
  }
);

// Hash password before saving to DB (removed bcrypt code)

const Study = mongoose.model("Study", studySchema);
module.exports = Study;
