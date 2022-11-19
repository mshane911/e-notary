const axios = require('axios');
const express = require('express');
const router = express.Router();
const escape = require('escape-html')

const multer = require('multer')
const upload = multer({ dest: 'public/uploads/' })
var file = null

// const fs = require('fs')

router.post("/", upload.single('file'), (req, res, next) => {
    console.log('body:', req.body);
    console.log('files:', req.file);

    // res.json({ message: "Successfully upload file" });
    res.send(escape(req.file))
});

router.get("/", (req, res) => {
    console.log(file)
});

module.exports = router;