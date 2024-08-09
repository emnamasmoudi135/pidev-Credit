const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

// Connect to database
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
