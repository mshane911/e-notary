const express = require("express");
const router = express.Router();
const auth = require("../../auth");

router.post("/", auth, (req, res, next) => {
    res.clearCookie("accesstoken").json({
        authStatus: false,
        message: "Logout Successfully"
    });
    res.send();
})

module.exports = router;