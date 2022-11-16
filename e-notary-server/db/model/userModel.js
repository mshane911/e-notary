const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide a valid email address!"],
        unique: [true, "Email address already registered!"]
    },
    name: {
        type: String,
        required: [true, "Name is required!"],
        unique: false
    },
    userType: {
        type: String,
        required: [true, "Type is required"],
        unique: false
    },
    password: {
        type: String,
        required: [true, "Password Required!"],
        unique: false
    },
    gender: {
        type: String,
        required: false,
        unique: false
    },
    country: {
        type: String,
        required: false,
        unique: false
    },
    phoneNumber: {
        type: String,
        required: false,
        unique: [true, "Phone number already registered!"]
    }
});

module.exports = mongoose.model.user || mongoose.model("user", UserSchema)