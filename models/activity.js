// models/activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  completed: { type: Boolean, required: true, default: false },
  duration: { type: Number, required: true }, // in minutes
  calories_burned: { type: Number, default: 0 },
  activity_type: { 
    type: String, 
    enum: ['cardio', 'strength', 'flexibility', 'sports', 'other'],
    default: 'other'
  },
  intensity: { 
    type: String, 
    enum: ['low', 'moderate', 'high'],
    default: 'moderate'
  },
  notes: { type: String },
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
  // Additional metrics
  distance: { type: Number }, // in km
  sets: { type: Number }, // for strength training
  reps: { type: Number }, // for strength training
  weight: { type: Number }, // weight used in kg
  heart_rate_avg: { type: Number }, // average heart rate
  heart_rate_max: { type: Number }, // maximum heart rate
}, {
  timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);
