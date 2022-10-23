const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../db/model/userModel");
const auth = require("../../auth");

router.post("/", (req, res, next) => {
    User.findOne({
        email: req.body.email
    })
        .then((user) => {
            bcrypt.compare(req.body.password, user.password)
                .then((check) => {
                    if (!check) {
                        res.status(400).send({
                            message: "Passwords mismatch!",
                            error: error.message
                        });
                    }

                    // creating JWT Token
                    const accesstoken = jwt.sign(
                        {
                            userId: user._id,
                            userEmail: user.email
                        },
                        process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" }
                    );

                    res
                        .status(200)
                        .cookie('accesstoken', accesstoken, {
                            httpOnly: true
                        })
                        .send({
                            message: "Login Success!",
                            user: user,
                            accesstoken
                        });
                })
                .catch((error) => {
                    res.status(400).send({
                        message: "Passwords mismatch!",
                        error: error.message
                    });
                });
        })
        .catch((error) => {
            res.status(404).send({
                message: "Email not found",
                error
            });
        });
});

router.get("/", auth, (req, res, next) => {
    res.json({
        authStatus: true,
        user: req.user
    })
})

// router.delete("/", auth, (req, res, next) => {
//     res.clearCookie("accesstoken").json({
//         auth: false,
//         message: "Logout Successfully"
//     });
// })

module.exports = router;