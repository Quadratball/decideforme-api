const mongoose = require("mongoose");

const answerModel = new mongoose.Schema({
  _id: false,
  number: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  score: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Answer", answerModel);
