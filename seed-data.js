// seed-data.js - Sample data for testing your fitness tracker
const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Activity = require('./models/activity');
const Exercise = require('./models/exercise');
const User = require('./models/user');
const BodyMetrics = require('./models/bodyMetrics');
const Workout = require('./models/workout');
const Nutrition = require('./models/nutrition');

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fitness-tracker';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedDatabase() {
  try {
    console.log('🌱 Seeding database with sample data...');

    // Clear existing data
    await Activity.deleteMany({});
    await Exercise.deleteMany({});
    await User.deleteMany({});
    await BodyMetrics.deleteMany({});
    await Workout.deleteMany({});
    await Nutrition.deleteMany({});

    // Create sample user
    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      gender: 'male',
      height: 175, // cm
      weight: 75, // kg
      activity_level: 'moderately_active',
      fitness_goals: [
        {
          type: 'weight_loss',
          target_value: 70,
          target_date: new Date('2024-12-31'),
          current_value: 75,
          unit: 'kg'
        },
        {
          type: 'muscle_gain',
          target_value: 5,
          target_date: new Date('2024-12-31'),
          current_value: 0,
          unit: 'kg'
        }
      ]
    });

    console.log('✅ User created:', user.name);

    // Create sample exercises
    const exercises = await Exercise.create([
      {
        name: 'Push-ups',
        description: 'Classic bodyweight exercise for chest, shoulders, and triceps',
        category: 'strength',
        muscle_groups: ['chest', 'shoulders', 'triceps'],
        equipment_needed: ['none'],
        difficulty: 'beginner',
        instructions: [
          'Start in a plank position with hands slightly wider than shoulders',
          'Lower your body until chest nearly touches the floor',
          'Push back up to starting position',
          'Keep your body in a straight line throughout'
        ],
        tips: [
          'Keep your core tight',
          'Don\'t let your hips sag',
          'Breathe out on the way up'
        ],
        calories_per_minute: 8,
        is_time_based: false,
        default_sets: 3,
        default_reps: 15
      },
      {
        name: 'Running',
        description: 'Cardiovascular exercise for endurance and calorie burning',
        category: 'cardio',
        muscle_groups: ['legs', 'core'],
        equipment_needed: ['running_shoes'],
        difficulty: 'beginner',
        instructions: [
          'Start with a 5-minute warm-up walk',
          'Begin running at a comfortable pace',
          'Maintain steady breathing',
          'Cool down with a 5-minute walk'
        ],
        tips: [
          'Land on the balls of your feet',
          'Keep your posture upright',
          'Stay hydrated'
        ],
        calories_per_minute: 12,
        is_time_based: true,
        default_duration: 1800 // 30 minutes in seconds
      },
      {
        name: 'Squats',
        description: 'Lower body strength exercise targeting glutes and legs',
        category: 'strength',
        muscle_groups: ['glutes', 'quadriceps', 'hamstrings'],
        equipment_needed: ['none'],
        difficulty: 'beginner',
        instructions: [
          'Stand with feet shoulder-width apart',
          'Lower your body as if sitting back into a chair',
          'Keep your chest up and knees behind toes',
          'Return to starting position'
        ],
        tips: [
          'Keep your weight on your heels',
          'Don\'t let knees cave inward',
          'Go as low as comfortable'
        ],
        calories_per_minute: 6,
        is_time_based: false,
        default_sets: 3,
        default_reps: 20
      }
    ]);

    console.log('✅ Exercises created:', exercises.length);

    // Create sample activities
    const activities = await Activity.create([
      {
        name: 'Morning Run',
        date: new Date('2024-01-15'),
        completed: true,
        duration: 30,
        activity_type: 'cardio',
        intensity: 'moderate',
        distance: 5.2,
        calories_burned: 360,
        notes: 'Great morning run, felt energetic!',
        heart_rate_avg: 145
      },
      {
        name: 'Upper Body Workout',
        date: new Date('2024-01-16'),
        completed: true,
        duration: 45,
        activity_type: 'strength',
        intensity: 'high',
        sets: 3,
        reps: 15,
        calories_burned: 270,
        notes: 'Focused on chest and arms today'
      },
      {
        name: 'Yoga Session',
        date: new Date('2024-01-17'),
        completed: true,
        duration: 60,
        activity_type: 'flexibility',
        intensity: 'low',
        calories_burned: 180,
        notes: 'Relaxing yoga session, great for recovery'
      }
    ]);

    console.log('✅ Activities created:', activities.length);

    // Create sample body metrics
    const bodyMetrics = await BodyMetrics.create([
      {
        user_id: user._id,
        date: new Date('2024-01-01'),
        weight: 76,
        body_fat_percentage: 18,
        muscle_mass: 58,
        water_percentage: 55,
        measurements: {
          chest: 100,
          waist: 85,
          hips: 95,
          bicep: 35,
          thigh: 60
        }
      },
      {
        user_id: user._id,
        date: new Date('2024-01-15'),
        weight: 75,
        body_fat_percentage: 17,
        muscle_mass: 59,
        water_percentage: 56,
        measurements: {
          chest: 101,
          waist: 84,
          hips: 94,
          bicep: 36,
          thigh: 61
        }
      }
    ]);

    console.log('✅ Body metrics created:', bodyMetrics.length);

    // Create sample workout
    const workout = await Workout.create({
      name: 'Full Body Strength',
      description: 'Complete full body strength training workout',
      category: 'strength',
      difficulty: 'intermediate',
      estimated_duration: 60,
      exercises: [
        {
          exercise_id: exercises[0]._id, // Push-ups
          sets: 3,
          reps: 15,
          rest_time: 60
        },
        {
          exercise_id: exercises[2]._id, // Squats
          sets: 3,
          reps: 20,
          rest_time: 60
        }
      ],
      calories_burned_per_minute: 7,
      equipment_needed: ['none'],
      muscle_groups: ['chest', 'shoulders', 'triceps', 'glutes', 'legs']
    });

    console.log('✅ Workout created:', workout.name);

    // Create sample nutrition
    const nutrition = await Nutrition.create([
      {
        user_id: user._id,
        date: new Date('2024-01-15'),
        meal_type: 'breakfast',
        food_items: [
          {
            name: 'Oatmeal',
            quantity: 1,
            unit: 'cup',
            calories: 150,
            protein: 5,
            carbs: 27,
            fat: 3,
            fiber: 4
          },
          {
            name: 'Banana',
            quantity: 1,
            unit: 'medium',
            calories: 105,
            protein: 1,
            carbs: 27,
            fat: 0,
            fiber: 3
          }
        ]
      },
      {
        user_id: user._id,
        date: new Date('2024-01-15'),
        meal_type: 'lunch',
        food_items: [
          {
            name: 'Grilled Chicken Breast',
            quantity: 150,
            unit: 'g',
            calories: 231,
            protein: 43,
            carbs: 0,
            fat: 5,
            fiber: 0
          },
          {
            name: 'Brown Rice',
            quantity: 1,
            unit: 'cup',
            calories: 216,
            protein: 5,
            carbs: 45,
            fat: 2,
            fiber: 4
          }
        ]
      }
    ]);

    console.log('✅ Nutrition entries created:', nutrition.length);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - 1 User created`);
    console.log(`   - ${exercises.length} Exercises created`);
    console.log(`   - ${activities.length} Activities created`);
    console.log(`   - ${bodyMetrics.length} Body metrics created`);
    console.log(`   - 1 Workout created`);
    console.log(`   - ${nutrition.length} Nutrition entries created`);
    
    console.log('\n🔍 You can now view this data in MongoDB Compass!');
    console.log('🌐 Start your server with: npm start');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seeding function
seedDatabase();
