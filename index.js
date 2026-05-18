require('dotenv').config()
const connectDB = require('./db/dbconnection')
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        const server = app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });

        server.on("error", (error) => {
            console.log(error);
            process.exit(1);
        });
    })
    .catch((error) => {
        console.log(error);
        process.exit(1);
    })