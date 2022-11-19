const express = require('express');
const auth = require("../../auth");
const router = express.Router();
const fs = require('fs');

router.get("/", auth, (req, res, next) => {
    const userId = req.user.userId;
    var files = fs.readdirSync('./pdf/' + userId);
    res.send(files);
});

module.exports = router;