// models/exercise.js
const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  images: [{ type: String }],
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
