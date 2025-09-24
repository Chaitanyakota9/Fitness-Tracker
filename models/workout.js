// models/workout.js
const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { 
    type: String, 
    enum: ['cardio', 'strength', 'flexibility', 'hiit', 'yoga', 'pilates', 'sports'],
    required: true
  },
  difficulty: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  estimated_duration: { type: Number, required: true }, // in minutes
  exercises: [{
    exercise_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
    sets: { type: Number },
    reps: { type: Number },
    duration: { type: Number }, // in seconds for time-based exercises
    rest_time: { type: Number }, // in seconds
    weight: { type: Number }, // in kg
    notes: { type: String }
  }],
  calories_burned_per_minute: { type: Number, default: 5 },
  equipment_needed: [{ type: String }],
  muscle_groups: [{ type: String }],
  is_premium: { type: Boolean, default: false },
  created_by: { type: String, default: 'system' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema);
