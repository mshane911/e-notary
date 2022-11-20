const express = require('express');
const auth = require("../../auth");
const router = express.Router();
const fs = require('fs');
const escape = require('escape-html');

router.get("/", auth, (req, res, next) => {
    const userId = req.user.userId;
    var fileNames = fs.readdirSync('./pdf/' + userId);
    fileNames = fileNames.map((fileName) => {
        return escape(fileName);
    })
    res.send(fileNames);
});

module.exports = router;