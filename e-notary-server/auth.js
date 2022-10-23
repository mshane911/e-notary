const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");

module.exports = async (req, res, next) => {
    try {
        // Get Token from Request Header
        const token = await req.headers.cookie.split("=")[1];

        // Verify Token
        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Retrieve user details
        const user = await decodedToken;

        // Pass user to other endpoints
        req.user = user;

        // Got to next endpoint
        next();

    } catch (error) {
        res.status(401).json({
            headers: req.headers,
            error: "Invalid Request or Not Logged In",
            err: error
        })
    }
}