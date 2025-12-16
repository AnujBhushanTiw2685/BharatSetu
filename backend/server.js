const app = require('./src/app');
const mongoose = require('mongoose');
require('dotenv').config();

const startServer = async () => {
    try {
        // Wait for DB to connect first
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb connected");

        // Only then start the server
        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    } catch (err) {
        console.error("Failed to connect to DB:", err);
    }
};

startServer();
