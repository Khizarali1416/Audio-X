const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Import routes
const userRoutes = require('./routes/User');
const audioRoutes = require('./routes/Audio');
const likeRoutes = require('./routes/Like');

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
app.use(express.json()); 

// Static file serving
app.use('/uploads/audio', express.static(path.join(__dirname, 'uploads/audio')));
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/audios', audioRoutes);
app.use('/api/likes', likeRoutes);

// Server setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
