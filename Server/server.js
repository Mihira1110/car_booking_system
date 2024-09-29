const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const driverRoutes = require('./routes/driverRoutes');
const passengerRoutes = require('./routes/passengerRoutes'); // Corrected spelling
const tripRoutes = require('./routes/tripRoutes');
const adminDashboard =require('./routes/adminRoutes')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define routes
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', driverRoutes);
app.use('/', passengerRoutes);
app.use('/', tripRoutes);
app.use('/',adminDashboard);

// Basic route
app.get('/', (req, res) => {
  res.send('The server is up and running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server startup error:', err);
});
