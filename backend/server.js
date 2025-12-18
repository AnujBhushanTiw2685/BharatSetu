const app = require('./src/app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Wait for DB to connect first
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb connected");

        // Only then start the server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to DB:", err);
    }
};

startServer();
