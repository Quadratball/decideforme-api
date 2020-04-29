const router = require("express").Router();
const UserModel = require("../../models/User");

// POST Create a new user
router.post("/register", async (req, res) => {
  // Check if name already exists
  const userExists = await UserModel.findOne({ name: req.body.name });
  if (userExists) {
    return res.status(400).send("Username already taken.");
  }
  const user = new UserModel({
    name: req.body.name,
  });
  try {
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (error) {
    res.status(400).send(err);
  }
});

// GET User by _id
router.get("/:id", async (req, res) => {
  const userExists = await UserModel.findOne({ _id: req.params.id });
  res.send(userExists);
});

// DELETE Delete a user by _id
router.delete("/:id", (req, res) => {
  res.status(501).send("Not yet implemented.");
});

// PUT Update a user by _id
router.put("/:id", (req, res) => {
  res.status(501).send("Not yet implemented.");
});

module.exports = router;
