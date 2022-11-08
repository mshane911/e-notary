const axios = require('axios');
const express = require('express');
const router = express.Router();

router.post("/", (req, res, next) => {
    var botId = req.body.botId;
    var userId = req.body.userId;
    var count = req.body.count;
    var url = `https://hack-5.langcode.io/api/Hackathon/GetMessagesInSession?botId=${botId}&userId=${userId}&count=${count}`;
    axios.get(url)
        .then((apiRes) => {
            res.send(apiRes.data)
        })
        .catch((err) => {
            res.send({message: err.message})
        })
});

module.exports = router;