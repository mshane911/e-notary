const axios = require('axios');
const express = require('express');
const router = express.Router();

router.post("/", (req, res, next) => {
    var config = {
        headers: {
            "Authorization": `Bearer ${req.body.apiKey}`
        }
    }
    var data = "";
    var url = "https://api.usign.kr:18443/PDFsign/auth/createToken/";
    axios.post(url, data, config)
        .then((apiRes) => {
            res.send(apiRes.data)
        })
        .catch((err) => {
            res.send({message: err.message})
        })
});

module.exports = router;