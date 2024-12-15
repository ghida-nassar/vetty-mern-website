const mongoose = require('mongoose');
const dotenv = require('dotenv');

mongoose.set("strictQuery", true); // Keep this line if you want strict query mode
dotenv.config();

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL); // Removed deprecated options
        console.log('Connected to the database');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the process on failure
    }
};


