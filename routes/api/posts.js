const express = require("express");
const router = express.Router();
const PostModel = require("../../models/Post");
const UserModel = require("../../models/User");

// middleware to see if user is allowed
async function checkUserId(req, res, next) {
  // Get UserId from author
  try {
    const userExists = await UserModel.findById(req.body.userId);
    if (userExists) {
      next();
      return;
    } else {
      res.status(401).send("Unauthorized.");
      return;
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

// GET all posts
router.get("/", async (req, res) => {
  const filter = {
    respondentId: null,
  };
  const posts = await PostModel.find(filter);
  res.send(posts);
});

// POST Create a new post
router.post("/new", async (req, res) => {
  const post = new PostModel({
    question: req.body.question,
    authorId: req.body.userId,
  });
  try {
    const savedPost = await post.save();
    res.status(200).send(savedPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE A Post by _id and UserId
router.delete("/:id", function (req, res) {
  res.status(200).send("Delete post with id: " + req.params.id);
});

// PUT Update a Post by _id and UserId
router.put("/:id", function (req, res) {
  return res.status(200).send("Update post with id: " + req.params.id);
});

// PUT Answer a Post by _id and UserId
router.put("/answer/:postId", async function (req, res) {
  const update = {
    answer: req.body.answer,
    respondentId: req.body.userID,
  };
  // useFindAndmodify since the Model.findByIdAndUpdate in this form is depricated
  const options = { useFindAndModify: false };
  const id = req.params.postId;
  try {
    const post = await PostModel.findByIdAndUpdate(id, update, options);
    res.send(post);
  } catch (error) {
    res.status(500).send(err);
  }
});

module.exports = router;
