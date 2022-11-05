var axios = require('axios');
var express = require('express');
var router = express.Router();

router.post("/", (req, res, next) => {
    var config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`
        }
    }
    var data = "";
    var url = "https://api.usign.kr:18443/PDFsign/auth/verifyToken/";
    axios.post(url, data, config)
        .then((apiRes) => {
            res.send(apiRes.data)
        })
        .catch((err) => {
            console.log(err)
        })
});

module.exports = router;