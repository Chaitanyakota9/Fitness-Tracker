// models/bodyMetrics.js
const mongoose = require('mongoose');

const bodyMetricsSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true, default: Date.now },
  weight: { type: Number, required: true }, // in kg
  body_fat_percentage: { type: Number }, // percentage
  muscle_mass: { type: Number }, // in kg
  water_percentage: { type: Number }, // percentage
  bone_mass: { type: Number }, // in kg
  visceral_fat: { type: Number }, // level 1-59
  // Body measurements
  measurements: {
    chest: { type: Number }, // in cm
    waist: { type: Number }, // in cm
    hips: { type: Number }, // in cm
    bicep: { type: Number }, // in cm
    thigh: { type: Number }, // in cm
    neck: { type: Number } // in cm
  },
  notes: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('BodyMetrics', bodyMetricsSchema);
