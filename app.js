// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(config.mongodb.uri, config.mongodb.options)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
    console.log(`📊 Database: ${config.mongodb.uri.split('/').pop()}`);
  })
  .catch((err) => {
    console.log('❌ MongoDB connection error:', err.message);
    console.log('🔧 To fix this:');
    console.log('   1. Set MONGODB_URI environment variable');
    console.log('   2. Or install MongoDB locally');
    console.log('   3. Or use MongoDB Atlas (cloud)');
    console.log('🚀 Starting server without database connection...');
  });

// Models
const Activity = require('./models/activity');
const Exercise = require('./models/exercise');
const User = require('./models/user');
const BodyMetrics = require('./models/bodyMetrics');
const Workout = require('./models/workout');
const Nutrition = require('./models/nutrition');

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/activities', require('./routes/activityRoutes'));
app.use('/api/exercises', require('./routes/exerciseRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

// Start the server
app.listen(config.server.port, config.server.host, () => {
  console.log(`🚀 ${config.app.name} v${config.app.version} is running!`);
  console.log(`🌐 Server: http://${config.server.host}:${config.server.port}`);
  console.log(`📱 Environment: ${config.app.environment}`);
});
