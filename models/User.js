const mongoose  = require("mongoose");
const voteModel = require("./Vote");

const userSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  userName: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  created: {
    type: Date,
    default: Date.now,
  },
  posts: [{
    type: mongoose.Types.ObjectId,
    ref: "Post"
  }],
  votes: [voteModel.schema]
});

module.exports = mongoose.model("User", userSchema);
