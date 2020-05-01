// RELATIVE-ROUTE   METHOD  DESCRIPTION
// ===========================================

// ============================================

// Requires
const router      = require("express").Router({mergeParams: true});
const PostModel   = require("../../models/Post");
const UserModel   = require("../../models/User");

const res400 = "Bad request"
const res500 = "Internal server error";

router.post("/:number", async (req, res) => {
    try {
        var user = await UserModel.findOne({deviceId: req.body.deviceId});
        var post = await PostModel.findById(req.params.postId);

        var hasAlreadyVoted = user.votes.some(vote => {
            return vote.post.equals(req.params.postId);
        });
        if(hasAlreadyVoted){
            res.status(400).send(res400);
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


module.exports = router;