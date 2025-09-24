// routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const Activity = require('../models/activity');
const BodyMetrics = require('../models/bodyMetrics');

// Get weekly activity summary
router.get('/weekly-summary', async (req, res) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    
    const activities = await Activity.find({
      date: { $gte: startDate },
      completed: true
    });

    const summary = {
      total_activities: activities.length,
      total_duration: activities.reduce((sum, activity) => sum + activity.duration, 0),
      total_calories: activities.reduce((sum, activity) => sum + activity.calories_burned, 0),
      activities_by_type: {},
      activities_by_intensity: {},
      daily_breakdown: {}
    };

    // Group by activity type
    activities.forEach(activity => {
      summary.activities_by_type[activity.activity_type] = 
        (summary.activities_by_type[activity.activity_type] || 0) + 1;
      
      summary.activities_by_intensity[activity.intensity] = 
        (summary.activities_by_intensity[activity.intensity] || 0) + 1;
    });

    // Daily breakdown
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayKey = date.toISOString().split('T')[0];
      
      const dayActivities = activities.filter(activity => 
        activity.date.toISOString().split('T')[0] === dayKey
      );
      
      summary.daily_breakdown[dayKey] = {
        activities: dayActivities.length,
        duration: dayActivities.reduce((sum, activity) => sum + activity.duration, 0),
        calories: dayActivities.reduce((sum, activity) => sum + activity.calories_burned, 0)
      };
    }

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get monthly progress
router.get('/monthly-progress', async (req, res) => {
  try {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    
    const activities = await Activity.find({
      date: { $gte: startDate },
      completed: true
    }).sort({ date: 1 });

    const bodyMetrics = await BodyMetrics.find({
      date: { $gte: startDate }
    }).sort({ date: 1 });

    const progress = {
      activity_trend: activities.map(activity => ({
        date: activity.date,
        duration: activity.duration,
        calories: activity.calories_burned,
        type: activity.activity_type
      })),
      weight_trend: bodyMetrics.map(metric => ({
        date: metric.date,
        weight: metric.weight,
        body_fat: metric.body_fat_percentage
      })),
      total_workouts: activities.length,
      total_calories_burned: activities.reduce((sum, activity) => sum + activity.calories_burned, 0),
      average_workout_duration: activities.length > 0 ? 
        activities.reduce((sum, activity) => sum + activity.duration, 0) / activities.length : 0
    };

    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get fitness insights
router.get('/insights', async (req, res) => {
  try {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    
    const activities = await Activity.find({
      date: { $gte: last30Days },
      completed: true
    });

    const insights = {
      most_popular_activity: {},
      best_performing_day: {},
      consistency_score: 0,
      improvement_areas: [],
      achievements: []
    };

    // Find most popular activity type
    const activityCounts = {};
    activities.forEach(activity => {
      activityCounts[activity.activity_type] = (activityCounts[activity.activity_type] || 0) + 1;
    });
    
    insights.most_popular_activity = Object.keys(activityCounts).reduce((a, b) => 
      activityCounts[a] > activityCounts[b] ? a : b, 'none'
    );

    // Calculate consistency score (percentage of days with at least one activity)
    const uniqueDays = new Set(activities.map(activity => 
      activity.date.toISOString().split('T')[0]
    )).size;
    insights.consistency_score = Math.round((uniqueDays / 30) * 100);

    // Generate improvement suggestions
    if (insights.consistency_score < 50) {
      insights.improvement_areas.push('Increase workout frequency');
    }
    if (!activityCounts.cardio) {
      insights.improvement_areas.push('Add cardio exercises');
    }
    if (!activityCounts.strength) {
      insights.improvement_areas.push('Include strength training');
    }

    // Generate achievements
    if (insights.consistency_score >= 80) {
      insights.achievements.push('Consistency Champion!');
    }
    if (activities.length >= 20) {
      insights.achievements.push('Workout Warrior!');
    }

    res.json(insights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
