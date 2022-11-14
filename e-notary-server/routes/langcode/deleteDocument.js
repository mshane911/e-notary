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
    var data = req.body.docId;
    var url = "https://hack-5.langcode.io/api/Hackathon/DeleteDocument/";
    axios.post(url, data, config)
        .then((apiRes) => {
            res.send(apiRes.data)
        })
        .catch((err) => {
            res.send({message: err.message})
        })
});

module.exports = router;