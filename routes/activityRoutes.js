// routes/activityRoutes.js
const express = require('express');
const router = express.Router();
const Activity = require('../models/activity');

// Create a new activity
router.post('/', async (req, res) => {
  const { name, date, completed, duration } = req.body;
  var calories_burned;
  if (completed) {
    calories_burned = duration * 5;
  } else {
    calories_burned = 0;
  }
  Activity.create({ name, date, completed, duration, calories_burned })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send(err);
    });
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
