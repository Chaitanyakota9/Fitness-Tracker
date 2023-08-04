// routes/exerciseRoutes.js
const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise');

// Create a new exercise
router.post('/', async (req, res) => {
  const { name, description, duration, images } = req.body;

  try {
    const exercise = await Exercise.create({ name, description, duration, images });
    res.json(exercise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all exercises
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get exercise by name
router.get('/:name', async (req, res) => {
  const exerciseName = req.params.name;
  try {
    const exercise = await Exercise.findOne({ name: exerciseName });
    if (exercise) {
      res.json(exercise);
    } else {
      res.status(404).json({ message: 'Exercise not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
