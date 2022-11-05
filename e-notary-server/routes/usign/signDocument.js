var axios = require('axios');
var express = require('express');
var router = express.Router();

router.post("/", (req, res, next) => {
    var data = req.body;
    var url = "https://api.usign.kr:18443/PDFsign/sign/";
    axios.post(url, data)
        .then((apiRes) => {
            res.send(apiRes.data)
        })
        .catch((err) => {
            console.log(err)
        })
});

module.exports = router;