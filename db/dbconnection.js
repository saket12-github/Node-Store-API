const mongoose = require('mongoose')


const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/node-store-api";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

module.exports = connectDB;