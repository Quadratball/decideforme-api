// Requires
require("dotenv").config();
const express   = require("express");
const mongoose  = require("mongoose");

const userRoute     = require("./routes/api/users");
const postsRoute    = require("./routes/api/posts");
const answersRoute  = require("./routes/api/answers");
const indexRoute    = require("./routes/index");

// Express
const app = express();
app.use(express.json());

// Mongoose
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use("/api/users", userRoute);
app.use("/api/posts", postsRoute);
app.use("/api/posts/:postId", answersRoute)
app.use(indexRoute);

// Starting server
const PORT  = process.env.PORT  || 3000;
const IP    = process.env.IP    || "127.0.0.1" // try 0.0.0.0 if you get an error. if you have still have errors just use app.listen(PORT);
app.listen(PORT, IP, () => {console.log("Server started on " + IP + ":" + PORT)});