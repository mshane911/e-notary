var express = require('express');
var router = express.Router();

// Server Index
router.get('/', function (req, res, next) {
    let response = {}
    response.data = "Welcome to E-Notary"
    res.status(200).send(response)
});

module.exports = router;