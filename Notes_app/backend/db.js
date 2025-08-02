//To resolve this issue, modify your connectToMongo function in db.js to use async/await instead of a callback, as the latest version of Mongoose no longer supports the callback method.  The error you're encountering is due to a recent update in Mongoose where mongoose.connect() no longer accepts a callback function. Instead, you should use async/await for handling the database connection.
//To resolve this issue, modify your connectToMongo function in db.js to use async/await instead of a callback, as the latest version of Mongoose no longer supports the callback method.  The error you're encountering is due to a recent update in Mongoose where mongoose.connect() no longer accepts a callback function. Instead, you should use async/await for handling the database connection.

const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

module.exports = connectToMongo;

