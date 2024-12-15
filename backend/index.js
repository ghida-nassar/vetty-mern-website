const express = require("express");
const app = express();
const cors = require("cors");
const DB = require("./database").connectDB;
require('dotenv').config();

// Routes
const appointmentRoutes = require('./routes/appointmentRoutes');
const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const userRoutes = require('./routes/userRoutes');


// Connect to the Database
DB();

app.get('/', (req, res) => {
    res.send('Welcome to the API');
  });
  

app.use(cors({
    origin: 'http://localhost:3000', // Allow the frontend on port 3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // If you're sending cookies, set this to true
  }));
// Middleware
app.use(express.json()); // Parses incoming JSON requests

// Route handling
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/pets', petRoutes);
app.use('/api/v1/users', userRoutes);

// Handle undefined routes (404 Not Found)
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

// Start the server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
