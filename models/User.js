const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  userName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  posts: [
    {
      ref: "Post",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
