# Fitness Tracker

A personal fitness tracking app I built to help track workouts, body metrics, and fitness goals. It's got a clean interface and stores everything in MongoDB.

## What it does

- Track your workouts with details like duration, calories burned, and activity type
- Monitor your body metrics over time (weight, BMI, etc.)
- Set and track fitness goals with progress bars
- View your recent activities and weekly stats
- Edit your profile and update your information
- Works on desktop and mobile

## Getting started

You'll need Node.js and MongoDB running. I've included setup scripts to make this easier.

### Install dependencies
```bash
npm install
```

### Set up the database

I've made this pretty straightforward with a setup script:

```bash
node setup-mongodb.js
```

This will walk you through the options:
- Use MongoDB Atlas (cloud) - easiest option
- Install MongoDB locally 
- Use Docker

### Run the app
```bash
npm start
```

Then open http://localhost:3000 in your browser.

## How it's built

The app uses Node.js with Express for the backend and stores data in MongoDB. The frontend is vanilla JavaScript with a clean, responsive design.

### Database structure

I've set up several collections to track different aspects of fitness:

- **Activities** - Your workouts with details like duration, calories, and activity type
- **Users** - Profile information, goals, and calculated metrics like BMI
- **Body Metrics** - Weight tracking and body composition over time
- **Exercises** - A database of exercises with instructions and tips
- **Workouts** - Pre-made workout routines
- **Nutrition** - Meal tracking (basic implementation)

### API endpoints

The backend provides REST APIs for:
- `/api/activities` - CRUD operations for activities
- `/api/user` - User profile and dashboard data
- `/api/analytics` - Weekly summaries and progress tracking
- `/api/exercises` - Exercise database

### Frontend

The interface is built with vanilla JavaScript and CSS. It's responsive and includes:
- A dashboard showing your stats and recent activities
- Forms for adding new activities with smart field visibility
- A profile editor with real-time updates
- Progress bars for your fitness goals

## Project structure

```
Fitness-Tracker/
├── models/          # MongoDB schemas
├── routes/          # API endpoints
├── public/          # Frontend files
│   ├── css/         # Styles
│   ├── js/          # JavaScript
│   └── *.html       # HTML pages
├── config.js        # App configuration
├── app.js           # Main server file
└── setup-mongodb.js # Database setup helper
```

## Adding sample data

I've included a script to populate the database with some sample data:

```bash
npm run seed
```

This adds a sample user, some exercises, and a few activities to get you started.

## Configuration

The app uses environment variables. Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/fitness-tracker
PORT=3000
NODE_ENV=development
```

## Deployment

For production, you'll want to:
1. Set up a MongoDB Atlas cluster (or your preferred MongoDB hosting)
2. Set the `MONGODB_URI` environment variable to your production database
3. Deploy to your preferred platform (Heroku, Vercel, etc.)

## Development

To add new features:
1. Update the models in `models/` if you need new data structures
2. Add API routes in `routes/`
3. Update the frontend in `public/`
4. Test everything works together

## Issues

If you run into problems:
- Check that MongoDB is running
- Make sure all dependencies are installed with `npm install`
- Check the console for any error messages
- Verify your `.env` file is set up correctly

---

That's it! Feel free to fork this and customize it for your own fitness tracking needs.