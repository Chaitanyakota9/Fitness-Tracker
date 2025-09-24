// routes/activityRoutes.js
const express = require('express');
const router = express.Router();
const Activity = require('../models/activity');

// Create a new activity
router.post('/', async (req, res) => {
  try {
    const { 
      name, 
      date, 
      completed, 
      duration, 
      activity_type, 
      intensity, 
      notes, 
      distance, 
      sets, 
      reps, 
      weight, 
      heart_rate_avg, 
      heart_rate_max 
    } = req.body;

    // Calculate calories based on activity type and intensity
    let calories_burned = 0;
    if (completed) {
      const baseCalories = duration * 5; // base 5 calories per minute
      const intensityMultiplier = intensity === 'low' ? 0.7 : intensity === 'high' ? 1.5 : 1.0;
      const typeMultiplier = activity_type === 'cardio' ? 1.2 : activity_type === 'strength' ? 1.1 : 1.0;
      calories_burned = Math.round(baseCalories * intensityMultiplier * typeMultiplier);
    }

    const activity = await Activity.create({
      name,
      date: date || new Date(),
      completed: completed || false,
      duration,
      calories_burned,
      activity_type: activity_type || 'other',
      intensity: intensity || 'moderate',
      notes,
      distance,
      sets,
      reps,
      weight,
      heart_rate_avg,
      heart_rate_max
    });

    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark an activity as completed
router.patch('/:id', async (req, res) => {
  const duration = req.body.duration;
  const calories = duration * 5;
  try {
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { completed: 1, calories_burned: calories },
      { new: true } // To return the updated activity data
    );
    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all activities for a user
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an activity
router.delete('/:id', async (req, res) => {
  Activity.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send('Data deleted successfully');
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
