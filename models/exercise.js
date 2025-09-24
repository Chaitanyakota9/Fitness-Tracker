// models/exercise.js
const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['cardio', 'strength', 'flexibility', 'balance', 'sports'],
    required: true
  },
  muscle_groups: [{ type: String }], // chest, back, legs, arms, core, etc.
  equipment_needed: [{ type: String }], // none, dumbbells, barbell, machine, etc.
  difficulty: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  instructions: [{ type: String }], // step-by-step instructions
  tips: [{ type: String }], // form tips and safety notes
  image_urls: [{ type: String }],
  video_url: { type: String },
  // Exercise metrics
  calories_per_minute: { type: Number, default: 5 },
  is_time_based: { type: Boolean, default: false }, // true for cardio, false for strength
  default_sets: { type: Number, default: 3 },
  default_reps: { type: Number, default: 10 },
  default_duration: { type: Number }, // in seconds for time-based exercises
  rest_time: { type: Number, default: 60 }, // in seconds
  // Safety and modifications
  contraindications: [{ type: String }], // when not to do this exercise
  modifications: [{ 
    difficulty: { type: String },
    description: { type: String }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Exercise', exerciseSchema);
