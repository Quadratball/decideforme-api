const router = require("express").Router();
const UserModel = require("../../models/User");

// POST Register a new user
router.post("/register", async (req, res) => {
  // Check if deviceId already exists
  const userExists = await UserModel.findOne({ deviceId: req.body.deviceId });
  if (userExists) {
    return res.status(400).send();
  }
  const user = new UserModel({
    deviceId: req.body.deviceId,
    userName: req.body.userName,
  });
  try {
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (error) {
    res.status(400).send(err);
  }
});

// GET User by _id
router.get("/:deviceId", async (req, res) => {
  try {
    const filter = {
      deviceId: req.params.deviceId,
    };
    const userExists = await UserModel.findOne(filter);
    if (userExists) {
      res.send(userExists);
    } else {
      res.status(404).send("No user found with id of " + deviceId);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE Delete a user by _id
router.delete("/:deviceId", async (req, res) => {
  const filter = {
    deviceId: req.params.deviceId,
  };
  try {
    const removedUser = await UserModel.findOneAndRemove(filter);
    res.status(200).send("Removed user with deviceId: " + req.params.deviceId);
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT Update a user by _id
router.put("/:deviceId", async (req, res) => {
  const filter = {
    deviceId: req.params.deviceId,
  };
  const options = {
    userName: req.body.newUserName,
  };
  try {
    const updatedUser = await UserModel.findOneAndUpdate(filter, options);
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
