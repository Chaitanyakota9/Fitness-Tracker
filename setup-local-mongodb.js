#!/usr/bin/env node

// setup-local-mongodb.js - Setup script for local MongoDB with Compass
const fs = require('fs');
const { exec } = require('child_process');

console.log('🏋️‍♀️ Fitness Tracker - Local MongoDB Setup with Compass\n');

// Create .env file for local MongoDB
const envContent = `MONGODB_URI=mongodb://localhost:27017/fitness-tracker
PORT=3000
NODE_ENV=development
`;

try {
  fs.writeFileSync('.env', envContent);
  console.log('✅ .env file created for local MongoDB');
  console.log('📊 Connection string: mongodb://localhost:27017/fitness-tracker\n');
} catch (error) {
  console.log('❌ Error creating .env file:', error.message);
}

console.log('🔧 MongoDB Compass Setup Instructions:');
console.log('1. Open MongoDB Compass');
console.log('2. Click "New Connection"');
console.log('3. Enter connection string: mongodb://localhost:27017');
console.log('4. Click "Connect"');
console.log('5. Create a new database called "fitness-tracker"\n');

console.log('🚀 Next Steps:');
console.log('1. Make sure MongoDB is running locally');
console.log('2. Run: node seed-data.js (to add sample data)');
console.log('3. Run: npm start (to start your server)');
console.log('4. Open: http://localhost:3000\n');

console.log('💡 Pro Tips for MongoDB Compass:');
console.log('- Use the "Documents" tab to view your data');
console.log('- Use the "Schema" tab to analyze your data structure');
console.log('- Use the "Indexes" tab to optimize performance');
console.log('- Use the "Validation" tab to add data validation rules');
console.log('- Use the "Profiler" tab to monitor query performance\n');

// Check if MongoDB is running
exec('mongosh --eval "db.runCommand({ping: 1})"', (error, stdout, stderr) => {
  if (error) {
    console.log('⚠️  MongoDB might not be running. To start it:');
    console.log('   macOS: brew services start mongodb/brew/mongodb-community');
    console.log('   Linux: sudo systemctl start mongod');
    console.log('   Windows: net start MongoDB\n');
  } else {
    console.log('✅ MongoDB is running and accessible!');
  }
});
