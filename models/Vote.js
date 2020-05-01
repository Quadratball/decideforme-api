const mongoose = require("mongoose");

const voteModel = new mongoose.Schema({
    _id: false,
    post: mongoose.Types.ObjectId,
    answer: Number
});

module.exports = mongoose.model("Vote", voteModel);
