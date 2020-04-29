const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
app.use(express.json());

dotenv.config();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 3000;

// Users
const userRoute = require("./routes/api/users");
app.use("/api/users", userRoute);

// Posts
const postsRoute = require("./routes/api/posts");
app.use("/api/posts", postsRoute);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Server is running.</h1>");
});

app.listen(PORT);
