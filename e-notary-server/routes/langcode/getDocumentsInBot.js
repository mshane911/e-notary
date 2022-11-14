const axios = require('axios');
const express = require('express');
const router = express.Router();

router.post("/", (req, res, next) => {
    var botId = req.body.botId;
    var url = `https://hack-5.langcode.io/api/Hackathon/GetDocumentsInBot?id="${botId}"`;
    axios.get(url)
        .then((apiRes) => {
            res.send(apiRes.data)
        })
        .catch((err) => {
            res.send({message: err.message})
        })
});

module.exports = router;