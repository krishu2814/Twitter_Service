const mongoose = require("mongoose");
const dotenv = require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // better
        // await mongoose.connect('mongodb://localhost/twitter_db');
    console.log("MongoDB connected");
  } catch (error) {
        console.error("DB connection failed", error);
        process.exit(1);
  }
};

module.exports = connectDB;