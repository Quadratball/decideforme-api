// RELATIVE-ROUTE   METHOD  DESCRIPTION
// ===========================================
// /                GET     get all posts
// /                POST    create new post
// /:id             DELETE  delete post by _id
// ============================================

// Requires
const router      = require("express").Router();
const PostModel   = require("../../models/Post");
const UserModel   = require("../../models/User");
const middleware  = require("../../middleware");

// HTTP error strings
const res400 = "Bad request"
const res500 = "Internal server error";

// GET all posts
router.get("/", async (req, res) => {
  try{
    const posts = await PostModel.find();
    res.status(200).send(posts);
  } catch (err){
    console.log(err);
    res.status(500).send(res500);
  }
});

// GET specific post
router.get("/TODO", async (req, res) => {
  try{
    const posts = await PostModel.find();
    res.status(200).send(posts);
  } catch (err){
    console.log(err);
    res.status(500).send(res500);
  }
});

// POST Create a new post
router.post("/", middleware.checkUserId, async (req, res) => {
  req.body.post.answers.forEach((answer, index) => {answer.number = index});
  try {
    var   user  = await UserModel.findOne({deviceId: req.body.deviceId});
    const post  = await PostModel.create(req.body.post);
    user.posts.push(post);
    user.save();
    console.log("Created post:\n" + post)
    res.status(200).send(post);
  } catch (err) {
    console.log(err)
    res.status(500).send(res500);
  }
});

// DELETE A Post by _id and UserId
router.delete("/:id", async (req, res) => {
  try {
    const post = await PostModel.findByIdAndDelete(req.params.id);
    if(post){
      var user = await UserModel.findOne({posts: post._id});
      user.posts.pull(post._id);
      user.save();
      console.log("Deleted Post:\n" + post);
      res.status(200).send(post);
    }
    else {res.status(400).send(res400)}
  } catch(err) {
    console.log(err);
    res.status(500).send(res500);
  }

});

// Do we need this?
/*
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
  } catch (err) {
    res.status(500).send(err);
  }
});
*/
module.exports = router;
