// RELATIVE-ROUTE   METHOD  DESCRIPTION
// ========================================
// /                POST    create new user
// /:deviceId       GET     get info about user
// /:devideId       DELETE  delete user
// ========================================

const router    = require("express").Router();
const UserModel = require("../../models/User");

// HTTP error strings
const res500 = "Internal server error";

// POST Register a new user
router.post("/", async (req, res) => {
  // Check if deviceId already exists
  const userExists = await UserModel.findOne({ deviceId: req.body.deviceId });
  if (userExists) {return res.status(400).send("User already exists")}
  else {
    const user = new UserModel({
      deviceId: req.body.deviceId,
      userName: req.body.userName,
    });
    try {
      const savedUser = await user.save();
      console.log("New user:\n" + savedUser);
      res.status(200).send(savedUser);
    } catch (err) {
      console.log(err);
      res.status(500).send(res500);
    }
  }
});

// GET User by deviceId
router.get("/:deviceId", async (req, res) => {
  try {
    const filter = {deviceId: req.params.deviceId};
    const user = await UserModel.findOne(filter);
    if (user){res.status(200).send(user)}
    else {res.status(404).send("No user found with id of " + deviceId)}
  } catch (err) {
    console.log(err)
    res.status(500).send(res500);
  }
});

// DELETE Delete a user by deviceId
router.delete("/:deviceId", async (req, res) => {
  const filter = {deviceId: req.params.deviceId};
  try {
    const removedUser = await UserModel.findOneAndRemove(filter);
    console.log("Deleted User:\n" + removedUser);
    res.status(200).send(removedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(res500);
  }
});


// Do we need this?
/*
// PUT Update a user by deviceId
router.put("/:deviceId", async (req, res) => {
  const filter = {deviceId: req.params.deviceId};
  const options = {userName: req.body.newUserName};
  try {
    let updatedUser = await UserModel.findOneAndUpdate(filter, options);
    updatedUser = await UserModel.find(filter);
    console.log("Updated User:\n" + updatedUser);
    res.status(200).send(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
*/

module.exports = router;
