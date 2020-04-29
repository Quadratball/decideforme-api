const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  question: {
    type: String,
    requried: true,
    min: 6,
    max: 255,
  },
  authorId: {
    type: String,
    required: true,
  },
  respondentId: {
    type: String,
    default: "",
  },
  answer: {
    type: String,
    min: 6,
    max: 255,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
