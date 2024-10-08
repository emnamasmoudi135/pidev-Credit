const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const applicationRoutes = require('./routes/applicationRoutes');
const uploadRoutes = require('./routes/uploadRoutes'); // <- Import upload routes
const adminRoutes = require('./routes/adminRoutes');


dotenv.config();

// Connect to database
connectDB();

const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;


app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

//Static folder for serving uploaded files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/upload', uploadRoutes); // <- Add upload route
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
