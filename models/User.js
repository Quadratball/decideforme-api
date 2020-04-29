const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requried: true,
    min: 6,
    max: 255,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  posts: {
    type: [String],
    default: undefined,
  },
  answers: {
    type: [String],
    default: undefined,
  },
});

module.exports = mongoose.model("User", userSchema);
