const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
    var url = "https://hack-5.langcode.io/api/Hackathon/GetBots/";
    axios.get(url)
        .then((apiRes) => {
            res.send(apiRes.data)
        })
        .catch((err) => {
            res.send({message: err.message})
        })
});

module.exports = router;