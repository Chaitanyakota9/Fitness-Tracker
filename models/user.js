// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  height: { type: Number, required: true }, // in cm
  weight: { type: Number, required: true }, // in kg
  activity_level: { 
    type: String, 
    enum: ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active'],
    default: 'moderately_active'
  },
  fitness_goals: [{
    type: { type: String, enum: ['weight_loss', 'muscle_gain', 'endurance', 'strength', 'flexibility'] },
    target_value: { type: Number },
    target_date: { type: Date },
    current_value: { type: Number, default: 0 },
    unit: { type: String }
  }],
  preferences: {
    units: { type: String, enum: ['metric', 'imperial'], default: 'metric' },
    notifications: { type: Boolean, default: true },
    theme: { type: String, default: 'light' }
  }
}, {
  timestamps: true
});

// Virtual for BMI calculation
userSchema.virtual('bmi').get(function() {
  const heightInMeters = this.height / 100;
  return (this.weight / (heightInMeters * heightInMeters)).toFixed(1);
});

// Virtual for BMR calculation (Basal Metabolic Rate)
userSchema.virtual('bmr').get(function() {
  if (this.gender === 'male') {
    return Math.round(88.362 + (13.397 * this.weight) + (4.799 * this.height) - (5.677 * this.age));
  } else {
    return Math.round(447.593 + (9.247 * this.weight) + (3.098 * this.height) - (4.330 * this.age));
  }
});

module.exports = mongoose.model('User', userSchema);
