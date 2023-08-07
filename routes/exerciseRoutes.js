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
  const name = req.query.name;
  console.log(name)
  try {
    const exercise = await Exercise.findOne({ name: exerciseName });
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    res.json(exercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get exercise by name
router.get('/:name', async (req, res) => {
  const exerciseName = req.params.name;
  try {
    const exercise = await Exercise.findOne({ name: exerciseName });
    if(exercise){
      res.json(exercise)
    }
    else{
      return res.status(404).json({ description: 'Exercise not found',time: 0 });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
