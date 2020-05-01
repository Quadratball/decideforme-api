// Requires
const express     = require("express");
const mongoose    = require("mongoose");
const dotenv      = require("dotenv");

const userRoute   = require("./routes/api/users");
const postsRoute  = require("./routes/api/posts");
const indexRoute  = require("./routes/index");

// Express
const app = express();
app.use(express.json());
dotenv.config();

// Mongoose
/*
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
*/
mongoose.connect('mongodb://194.13.80.247:80', {
    user: "GnHNAGW6GoDkph2Jr97v",
    pass: "mZdJSdKBee4DkCRSWQ6j",
    dbName: "DecideForMe",
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// Routes
app.use("/api/users", userRoute);
app.use("/api/posts", postsRoute);
app.use(indexRoute);

// Starting server
const PORT = process.env.PORT || 3000;
app.listen(80, "127.0.0.1", () => {console.log("Server started")});