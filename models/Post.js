const mongoose = require("mongoose");
const Answer = require("./Answer");

const postSchema = new mongoose.Schema({
  question: {
    type: String,
    requried: true,
    min: 6,
    max: 255
  },
  answers: [Answer.schema],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", postSchema);
