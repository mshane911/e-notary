const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../db/model/userModel");
const { response } = require("express");
const dbConnect = require("../../db/dbConnect");
const auth = require("../../auth");

router.post("/", auth, (req, res, next) => {
    if ('userType' in req.body) {
        if (!(["notary", "employee", "company"].includes(req.body.userType))) {
            res.status(500).send({
                message: "Error updating user",
                error: `User type is wrong sent ${req.body.userType}`
            })
            return
        }
    }
    if ('gender' in req.body) {
        if(!(["Male", "Female"].includes(req.body.gender))) {
            res.status(500).send({
                message: "Error updating user",
                error: `Gender is wrong sent ${req.body.gender}`
            })
            return
        }   
    }
    const filter = { _id: req.user.userId };
    const update = req.body;
    User.findOneAndUpdate(filter, update)
    .then(res.status(200).send({
        message: "User updated successfully"
    }))
    .catch((error) => {
        res.status(500).send({
            message: "Error updating user",
            error
        });
    });   
});

module.exports = router;