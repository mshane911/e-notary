const axios = require('axios');
const express = require('express');
const router = express.Router();

router.post("/", (req, res, next) => {
    var config = {
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        }
    }
    var data = req.body.botId;
    var url = "https://hack-5.langcode.io/api/Hackathon/DeleteBot/";
    axios.post(url, data, config)
        .then((apiRes) => {
            res.send(apiRes.data)
        })
        .catch((err) => {
            res.send({message: err.message})
        })
});

module.exports = router;