// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get current user profile
router.get('/profile', async (req, res) => {
  try {
    // For now, get the first user (in a real app, this would be based on authentication)
    const user = await User.findOne().sort({ createdAt: -1 });
    
    if (!user) {
      return res.status(404).json({ message: 'No user found' });
    }

    // Calculate additional metrics
    const userWithMetrics = {
      ...user.toObject(),
      bmi: user.bmi,
      bmr: user.bmr,
      // Calculate goal progress
      goalProgress: user.fitness_goals.map(goal => {
        const progress = goal.current_value && goal.target_value ? 
          (goal.current_value / goal.target_value) * 100 : 0;
        return {
          ...goal,
          progress: Math.min(progress, 100)
        };
      })
    };

    res.json(userWithMetrics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const { name, age, height, weight, activity_level, fitness_goals } = req.body;
    
    // Find the first user (in a real app, this would be based on authentication)
    const user = await User.findOne().sort({ createdAt: -1 });
    
    if (!user) {
      return res.status(404).json({ message: 'No user found' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { 
        name, 
        age, 
        height, 
        weight, 
        activity_level,
        fitness_goals: fitness_goals || user.fitness_goals
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user dashboard data
router.get('/dashboard', async (req, res) => {
  try {
    const user = await User.findOne().sort({ createdAt: -1 });
    
    if (!user) {
      return res.status(404).json({ message: 'No user found' });
    }

    // Get recent activities (last 7 days)
    const Activity = require('../models/activity');
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentActivities = await Activity.find({
      date: { $gte: sevenDaysAgo },
      completed: true
    }).sort({ date: -1 }).limit(5);

    // Calculate weekly stats
    const weeklyStats = {
      totalWorkouts: recentActivities.length,
      totalDuration: recentActivities.reduce((sum, activity) => sum + activity.duration, 0),
      totalCalories: recentActivities.reduce((sum, activity) => sum + activity.calories_burned, 0),
      averageWorkoutDuration: recentActivities.length > 0 ? 
        Math.round(recentActivities.reduce((sum, activity) => sum + activity.duration, 0) / recentActivities.length) : 0
    };

    // Get body metrics trend
    const BodyMetrics = require('../models/bodyMetrics');
    const recentMetrics = await BodyMetrics.find({
      user_id: user._id
    }).sort({ date: -1 }).limit(5);

    const dashboardData = {
      user: {
        name: user.name,
        age: user.age,
        height: user.height,
        weight: user.weight,
        bmi: user.bmi,
        bmr: user.bmr,
        activity_level: user.activity_level
      },
      weeklyStats,
      recentActivities,
      bodyMetricsTrend: recentMetrics,
      fitnessGoals: user.fitness_goals
    };

    res.json(dashboardData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update fitness goals
router.put('/goals', async (req, res) => {
  try {
    const { goals } = req.body;
    
    const user = await User.findOne().sort({ createdAt: -1 });
    
    if (!user) {
      return res.status(404).json({ message: 'No user found' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { fitness_goals: goals },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
