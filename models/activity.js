// models/activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  completed: { type: Number, required: true },
  duration: { type: Number, required: true },
  calories_burned: { type: Number },
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }, // Reference to the Exercise model
});

module.exports = mongoose.model('Activity', activitySchema);
