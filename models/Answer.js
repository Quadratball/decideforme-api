const mongoose = require("mongoose");

const answerModel = new mongoose.Schema({
  number: {
    type: Number,
    default: 0,
  },
  text: {
    type: String,
    min: 6,
    max: 255,
  },
  score: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Answer", answerModel);
