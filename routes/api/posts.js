// RELATIVE-ROUTE   METHOD  DESCRIPTION
// ========================================
// /                GET     get all posts
// /                POST    create new post
// /:id             DELETE  delete post by _id
// ========================================

const express = require("express");
const router = express.Router();
const PostModel = require("../../models/Post");
const UserModel = require("../../models/User");

// middleware to see if user is allowed
async function checkUserId(req, res, next) {
  // Get UserId from author
  try {
    const userExists = await UserModel.findOne({deviceId: req.body.deviceId});
    if (userExists) {return next()}
    else {return res.status(401).send("Unauthorized.")}
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}

// GET all posts
router.get("/", async (req, res) => {
  const posts = await PostModel.find();
  res.send(posts);
});

// POST Create a new post
router.post("/", checkUserId, async (req, res) => {
  const filter = {deviceId: req.body.deviceId};
  try {
    UserModel.findOne(filter, (err, user) => {
      if(err){
        console.log(err);
        res.status(400).send(err);
      } else {
        req.body.post.answers.forEach((answer, index) => {answer.number = index});
        PostModel.create(req.body.post, (err, post) => {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          } else {
            console.log(post.answers);
            user.posts.push(post);
            user.save((err, user) =>{
              if(err){
                console.log(err);
                res.status(400).send(err);
              } else {
                return res.status(200).send(user);
              }
            });
          }
        });
      }
    });
  } catch (err) {
    console.log(err)
    res.send(404).send(err);
  }
});

// DELETE A Post by _id and UserId
router.delete("/:id", function (req, res) {
  PostModel.findByIdAndDelete(req.params.id, (err, post) =>{
    if(err){console.log(err)}
    else{res.status(200).send("Delete post with id: " + req.params.id);}
  });

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
