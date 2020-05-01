const router = require("express").Router();

router.get("/", (req, res) => {
    res.status(200).send("<h1>Server is running.</h1>");
});

router.get("*", (req, res) => {
    res.status(200).send("<h1>Server is running.</h1>");
});

module.exports = router;