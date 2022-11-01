const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../db/model/userModel");
const { response } = require("express");

router.post("/", (req, res, next) => {
    var userType = req.body.userType;
    if (!(["notary", "employee", "company"].includes(userType))) {
        res.status(500).send({
            message: "Error creating user",
            error: `User type is wrong sent ${userType}`
        })
    } else {
        bcrypt.hash(req.body.password, 10)
            .then((hashedPass) => {
                const user = new User({
                    email: req.body.email,
                    name: req.body.name,
                    userType: req.body.userType,
                    password: hashedPass
                });
                user
                    .save()
                    .then((result) => {
                        res.status(201).send({
                            message: "User Created Successfully",
                            result
                        });
                    })
                    .catch((error) => {
                        res.status(500).send({
                            message: "Error creating user",
                            error
                        });
                    });
            })
            .catch((error) => {
                res.status(500).send({
                    message: " Error hashing password",
                    error
                })
            });
    }
});

module.exports = router;