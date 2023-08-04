const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Swarup:Swarup2003@cluster0.ub6xphu.mongodb.net', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const Activity = require('./models/activity');
const Exercise = require('./models/exercise');

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/activities', require('./routes/activityRoutes'));
app.use('/api/exercises', require('./routes/exerciseRoutes'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
