const express = require('express');
const router = express.Router();
const auth = require("../../auth");
const User = require("../../db/model/userModel");

router.get("/", auth, (req, res, next) => {
    console.log(req.user)
    const query = User.where({ _id: req.user.userId });
    query.findOne(function (err, user) {
    if (err) return handleError(err);
        if (user) {
            res.send(user)
        }
        else {
            res.status(500).send({
                message: "Error getting user",
                error: `User not found`
            })
        }
    });
})

module.exports = router;