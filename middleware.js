const UserModel = require("./models/User");
const PostModel = require("./models/Post");

const middleware = {
  checkUserId : (async (req, res, next) => {
    try {
      const userExists = await UserModel.findOne({deviceId: req.body.deviceId});
      if (userExists) {return next()}
      else {return res.status(401).send("Unauthorized")}
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
  })
};



module.exports = middleware;