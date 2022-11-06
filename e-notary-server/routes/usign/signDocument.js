const axios = require('axios');
const express = require('express');
const router = express.Router();

router.post("/", (req, res, next) => {
    var data = req.body;
    var url = "https://api.usign.kr:18443/PDFsign/sign/";
    axios.post(url, data)
        .then((apiRes) => {
            res.send(apiRes.data)
        })
        .catch((err) => {
            res.send(err.message)
        })
});

module.exports = router;