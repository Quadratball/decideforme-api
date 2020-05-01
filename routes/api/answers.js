// RELATIVE-ROUTE   METHOD  DESCRIPTION
// ===========================================
// /:number         POST    vote for an answer
// /:numner         DELETE  delete a vote
// ============================================

// Requires
const router      = require("express").Router({mergeParams: true});
const PostModel   = require("../../models/Post");
const UserModel   = require("../../models/User");
const middleware  = require("../../middleware");

// HTTP error strings
const res400 = "Bad request"
const res401 = "Unauthorized"
const res500 = "Internal server error";

router.post("/:number", middleware.checkUserId, async (req, res) => {
    try {
        var user = await UserModel.findOne({deviceId: req.body.deviceId});
        var post = await PostModel.findById(req.params.postId);

        var hasAlreadyVoted = user.votes.some(vote => {return vote.post.equals(req.params.postId)});
        //var isOwnQuestion = user.posts.some(post => {return post.equals(req.params.postId)});
        if(hasAlreadyVoted){
            res.status(400).send("You already voted for this post");
        } else {
            const vote = {
                post: req.params.postId,
                answer: req.params.number
            }
            user.votes.push(vote)
            user.save();
            post.answers[req.params.number].score++;
            post.save();
            res.status(200).send(post);
        }
    } catch(err) {
        console.log(err);
        res.status(500).send(res500);
    }
});

router.delete("/:number", middleware.checkUserId, async (req, res) =>{
    try{
        var user = await UserModel.findOne({deviceId: req.body.deviceId});
        var post = await PostModel.findById(req.params.postId);

        user.votes.pull({
            post: req.params.postId,
            number: req.params.number
        });
        user.save()
        post.answers[res.params.number].score--;
        post.save();
        res.status(200).send(post);
    } catch(err) {
        console.log(err);
        res.status(500).send(res500);
    }
});

module.exports = router;