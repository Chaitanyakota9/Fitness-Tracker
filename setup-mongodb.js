#!/usr/bin/env node

// setup-mongodb.js - MongoDB Setup Helper Script
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🏋️‍♀️ Fitness Tracker - MongoDB Setup Helper\n');

console.log('Choose your MongoDB setup option:');
console.log('1. MongoDB Atlas (Cloud) - Recommended');
console.log('2. Local MongoDB Installation');
console.log('3. Docker MongoDB');
console.log('4. Skip setup (use existing connection)\n');

rl.question('Enter your choice (1-4): ', (choice) => {
  switch(choice) {
    case '1':
      setupMongoDBAtlas();
      break;
    case '2':
      setupLocalMongoDB();
      break;
    case '3':
      setupDockerMongoDB();
      break;
    case '4':
      console.log('✅ Skipping setup. Make sure your MONGODB_URI is configured.');
      rl.close();
      break;
    default:
      console.log('❌ Invalid choice. Please run the script again.');
      rl.close();
  }
});

function setupMongoDBAtlas() {
  console.log('\n🌐 MongoDB Atlas Setup:');
  console.log('1. Go to https://www.mongodb.com/cloud/atlas');
  console.log('2. Create a free account');
  console.log('3. Create a FREE M0 cluster');
  console.log('4. Create a database user');
  console.log('5. Get your connection string\n');
  
  rl.question('Enter your MongoDB Atlas connection string: ', (connectionString) => {
    if (connectionString && connectionString.startsWith('mongodb+srv://')) {
      // Create .env file
      const envContent = `MONGODB_URI=${connectionString}\nPORT=3000\nNODE_ENV=development\n`;
      
      try {
        fs.writeFileSync('.env', envContent);
        console.log('✅ .env file created successfully!');
        console.log('🚀 You can now start your server with: npm start');
      } catch (error) {
        console.log('❌ Error creating .env file:', error.message);
        console.log('📝 Please create a .env file manually with:');
        console.log(`MONGODB_URI=${connectionString}`);
      }
    } else {
      console.log('❌ Invalid connection string. Please make sure it starts with "mongodb+srv://"');
    }
    rl.close();
  });
}

function setupLocalMongoDB() {
  console.log('\n💻 Local MongoDB Installation:');
  console.log('For macOS:');
  console.log('1. Install Homebrew: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"');
  console.log('2. Install MongoDB: brew tap mongodb/brew && brew install mongodb-community');
  console.log('3. Start MongoDB: brew services start mongodb/brew/mongodb-community');
  console.log('4. Your connection string will be: mongodb://localhost:27017/fitness-tracker\n');
  
  console.log('For other systems, visit: https://docs.mongodb.com/manual/installation/');
  
  rl.question('Press Enter when MongoDB is installed and running...', () => {
    const envContent = `MONGODB_URI=mongodb://localhost:27017/fitness-tracker\nPORT=3000\nNODE_ENV=development\n`;
    
    try {
      fs.writeFileSync('.env', envContent);
      console.log('✅ .env file created for local MongoDB!');
    } catch (error) {
      console.log('❌ Error creating .env file:', error.message);
    }
    rl.close();
  });
}

function setupDockerMongoDB() {
  console.log('\n🐳 Docker MongoDB Setup:');
  console.log('1. Install Docker Desktop');
  console.log('2. Run: docker run --name fitness-mongodb -d -p 27017:27017 mongo:latest');
  console.log('3. Your connection string will be: mongodb://localhost:27017/fitness-tracker\n');
  
  rl.question('Press Enter when Docker MongoDB is running...', () => {
    const envContent = `MONGODB_URI=mongodb://localhost:27017/fitness-tracker\nPORT=3000\nNODE_ENV=development\n`;
    
    try {
      fs.writeFileSync('.env', envContent);
      console.log('✅ .env file created for Docker MongoDB!');
    } catch (error) {
      console.log('❌ Error creating .env file:', error.message);
    }
    rl.close();
  });
}
