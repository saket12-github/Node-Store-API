require('dotenv').config()
const connectDB = require('./db/dbconnection')
const express = require("express");
const app = express();
const productRoutes = require("./routes/product.route");

const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/products", productRoutes)

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ 
        success: false, 
        message: err.message || 'Something went wrong on the server' 
    });
})
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