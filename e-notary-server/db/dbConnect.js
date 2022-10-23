const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect(){
    mongoose
        .connect(
            process.env.DB_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        .then(() => {
            console.log("DB Connection Success");
        })
        .catch((error) => {
            console.log("DB Connection Error");
            console.error(error);
        })
}

module.exports = dbConnect;