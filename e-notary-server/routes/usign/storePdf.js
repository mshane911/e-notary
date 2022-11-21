const express = require('express');
const upload = require('express-fileupload');
const auth = require("../../auth");
const router = express.Router();
const fs = require('fs');
const sanitize = require("sanitize-filename");

router.post("/", auth, (req, res, next) => {
    const userId = req.user.userId;
    if (req.files) {
        var file = req.files.document;
        var dir = `./pdf/sign/${userId}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        var uploadPath = `${dir}/${userId}.pdf`;
        

        file.mv(uploadPath, function (err) {
            if (err) {
                res.send(err);
            } else {
                res.send("File Uploaded");
            }
        })
    }
});

module.exports = router;