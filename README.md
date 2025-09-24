# 🏋️‍♀️ Fitness Tracker

[![CI/CD Pipeline](https://github.com/Chaitanyakota9/Fitness-Tracker/workflows/🚀%20CI/CD%20Pipeline/badge.svg)](https://github.com/Chaitanyakota9/Fitness-Tracker/actions)
[![Daily Motivation](https://github.com/Chaitanyakota9/Fitness-Tracker/workflows/💪%20Daily%20Fitness%20Motivation/badge.svg)](https://github.com/Chaitanyakota9/Fitness-Tracker/actions)
[![Weekly Stats](https://github.com/Chaitanyakota9/Fitness-Tracker/workflows/📊%20Weekly%20Fitness%20Stats/badge.svg)](https://github.com/Chaitanyakota9/Fitness-Tracker/actions)
[![Database Health](https://github.com/Chaitanyakota9/Fitness-Tracker/workflows/🗄️%20MongoDB%20Health%20Check/badge.svg)](https://github.com/Chaitanyakota9/Fitness-Tracker/actions)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/database-MongoDB-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

A personal fitness tracking app I built to help track workouts, body metrics, and fitness goals. It's got a clean interface, stores everything in MongoDB, and comes with **automated workflows** that keep you motivated! 🚀

> **🎯 Repository Fitness Level:** This project is actively maintained with daily motivation, weekly progress tracking, and automated health checks!

## 🎯 What it does

- Track your workouts with details like duration, calories burned, and activity type
- Monitor your body metrics over time (weight, BMI, etc.)
- Set and track fitness goals with progress bars
- View your recent activities and weekly stats
- Edit your profile and update your information
- Works on desktop and mobile

## 🤖 Automated Workflows & Features

This repository comes with **fun automation** that treats your development work like a fitness journey:

### 💪 Daily Motivation
- **When:** Every day at 8 AM UTC
- **What:** Posts motivational fitness quotes and workout suggestions
- **Result:** Daily inspiration to keep coding and working out!

### 📊 Weekly Fitness Stats
- **When:** Every Sunday at 9 AM UTC  
- **What:** Analyzes your repository activity as fitness metrics
- **Tracks:** Commits = workouts, Lines of code = calories burned
- **Result:** Weekly fitness reports showing your "development fitness level"

### 🚀 CI/CD Pipeline
- **When:** On every push and pull request
- **What:** Tests code quality, runs security checks, prepares deployment
- **Features:** Multi-Node.js testing, automated health checks
- **Result:** Ensures your code is always healthy and ready to deploy

### 🗄️ Database Health Monitoring
- **When:** Every 6 hours
- **What:** Monitors MongoDB connection and database performance
- **Result:** Catches database issues before they become problems

### 🎨 Fun Templates
- **Bug Reports:** Fitness-themed issue templates
- **Feature Requests:** Impact assessment with fitness analogies
- **Pull Requests:** Difficulty ratings and time estimates

> **🎮 Gamification:** Your repository activity is tracked like a fitness game - every commit is a workout, every PR is a fitness challenge!

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

## 📁 Project structure

```
Fitness-Tracker/
├── .github/                    # 🤖 Automation & Workflows
│   ├── workflows/              # GitHub Actions workflows
│   │   ├── ci-cd.yml          # 🚀 CI/CD Pipeline
│   │   ├── fitness-motivation.yml # 💪 Daily Motivation
│   │   ├── fitness-stats.yml  # 📊 Weekly Stats
│   │   └── database-health.yml # 🗄️ Health Monitoring
│   └── ISSUE_TEMPLATE/         # 🎨 Fun Templates
├── models/                     # 📊 MongoDB schemas
├── routes/                     # 🛣️ API endpoints
├── public/                     # 🎨 Frontend files
│   ├── css/                   # 💅 Styles
│   ├── js/                    # ⚡ JavaScript
│   └── *.html                 # 📄 HTML pages
├── test/                      # 🧪 Health checks
├── config.js                  # ⚙️ App configuration
├── app.js                     # 🚀 Main server file
└── setup-mongodb.js           # 🗄️ Database setup helper
```

## 🔴 Live Status

| Workflow | Status | Last Run | Next Run |
|----------|--------|----------|----------|
| 💪 Daily Motivation | ![Daily Motivation](https://github.com/Chaitanyakota9/Fitness-Tracker/workflows/💪%20Daily%20Fitness%20Motivation/badge.svg) | Daily at 8 AM UTC | Tomorrow 8 AM UTC |
| 📊 Weekly Stats | ![Weekly Stats](https://github.com/Chaitanyakota9/Fitness-Tracker/workflows/📊%20Weekly%20Fitness%20Stats/badge.svg) | Every Sunday 9 AM UTC | Next Sunday 9 AM UTC |
| 🚀 CI/CD Pipeline | ![CI/CD](https://github.com/Chaitanyakota9/Fitness-Tracker/workflows/🚀%20CI/CD%20Pipeline/badge.svg) | On every push/PR | Next code change |
| 🗄️ Database Health | ![DB Health](https://github.com/Chaitanyakota9/Fitness-Tracker/workflows/🗄️%20MongoDB%20Health%20Check/badge.svg) | Every 6 hours | Next 6-hour cycle |

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

## 🎮 Repository Gamification

This repository treats development like a fitness journey:

- **🏃‍♂️ Commits** = Workouts completed
- **📊 Lines of code** = Calories burned  
- **🎯 Pull requests** = Fitness challenges
- **🏆 Issues resolved** = Personal records
- **📈 Repository activity** = Fitness progress

## 🚀 Quick Actions

| Action | Command | What it does |
|--------|---------|--------------|
| 🏃‍♂️ Start the app | `npm start` | Launches your fitness tracker |
| 🌱 Add sample data | `npm run seed` | Populates database with demo data |
| 🧪 Run health checks | `npm test` | Verifies everything is working |
| 🗄️ Setup database | `npm run setup` | Configures MongoDB connection |
| 🔧 Development mode | `npm run dev` | Starts with auto-reload |

## 📊 Repository Metrics

![GitHub last commit](https://img.shields.io/github/last-commit/Chaitanyakota9/Fitness-Tracker?style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/Chaitanyakota9/Fitness-Tracker?style=flat-square)
![GitHub contributors](https://img.shields.io/github/contributors/Chaitanyakota9/Fitness-Tracker?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/Chaitanyakota9/Fitness-Tracker?style=flat-square)

---

## 🎉 Contributing

Found a bug? Want to add a feature? Use our fun templates:

- 🐛 [Report a Bug](https://github.com/Chaitanyakota9/Fitness-Tracker/issues/new?template=bug-report.yml) - Fitness-themed bug reporting
- ✨ [Request a Feature](https://github.com/Chaitanyakota9/Fitness-Tracker/issues/new?template=feature-request.yml) - Impact assessment included
- 🔄 [Open a Pull Request](https://github.com/Chaitanyakota9/Fitness-Tracker/compare) - Difficulty ratings and time estimates

---

**🎯 Repository Fitness Level:** This project is actively maintained with daily motivation, weekly progress tracking, and automated health checks!

*Feel free to fork this and customize it for your own fitness tracking needs. The automation spirits are here to help!* 👻✨