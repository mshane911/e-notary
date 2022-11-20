const axios = require('axios');
const express = require('express');
const router = express.Router();
const FormData = require('form-data');
const fs = require('fs');
const auth = require("../../auth");

router.post("/", auth, (req, res, next) => {
    var botId = req.body.botId;
    var path = `./pdf/chat/${req.user.userId}.pdf`;
    var document = fs.createReadStream(path);
    
    const formData = new FormData();
    formData.append('file', document);

    var url = `https://hack-5.langcode.io/api/Hackathon/UploadFileToBot/?botId="${req.body.botId}"`;

    axios({
        method: "post",
        url: url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((apiRes) => {
            res.send(apiRes.data);
        })
        .catch((err) => {
            // console.log(err);
            console.log(err.message);
            res.send({message: err.message})
        })

});

module.exports = router;