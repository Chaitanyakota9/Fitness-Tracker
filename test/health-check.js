#!/usr/bin/env node

/**
 * Simple Health Check Tests for Fitness Tracker
 * This file runs basic checks to ensure the app is working properly
 */

const fs = require('fs');
const path = require('path');

console.log('🏋️‍♀️ Fitness Tracker - Health Check Tests\n');

let testsPassed = 0;
let testsFailed = 0;

function test(name, testFn) {
  try {
    testFn();
    console.log(`✅ ${name}`);
    testsPassed++;
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    testsFailed++;
  }
}

// Test 1: Check if main app file exists
test('Main app file exists', () => {
  if (!fs.existsSync(path.join(__dirname, '../app.js'))) {
    throw new Error('app.js not found');
  }
});

// Test 2: Check if package.json exists and has required fields
test('Package.json is valid', () => {
  const packagePath = path.join(__dirname, '../package.json');
  if (!fs.existsSync(packagePath)) {
    throw new Error('package.json not found');
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  if (!packageJson.name || !packageJson.version || !packageJson.main) {
    throw new Error('package.json missing required fields');
  }
});

// Test 3: Check if models directory exists
test('Models directory exists', () => {
  const modelsPath = path.join(__dirname, '../models');
  if (!fs.existsSync(modelsPath)) {
    throw new Error('models directory not found');
  }
});

// Test 4: Check if routes directory exists
test('Routes directory exists', () => {
  const routesPath = path.join(__dirname, '../routes');
  if (!fs.existsSync(routesPath)) {
    throw new Error('routes directory not found');
  }
});

// Test 5: Check if public directory exists
test('Public directory exists', () => {
  const publicPath = path.join(__dirname, '../public');
  if (!fs.existsSync(publicPath)) {
    throw new Error('public directory not found');
  }
});

// Test 6: Check if main HTML file exists
test('Main HTML file exists', () => {
  const htmlPath = path.join(__dirname, '../public/index.html');
  if (!fs.existsSync(htmlPath)) {
    throw new Error('public/index.html not found');
  }
});

// Test 7: Check if CSS file exists
test('CSS file exists', () => {
  const cssPath = path.join(__dirname, '../public/css/style.css');
  if (!fs.existsSync(cssPath)) {
    throw new Error('public/css/style.css not found');
  }
});

// Test 8: Check if JavaScript file exists
test('JavaScript file exists', () => {
  const jsPath = path.join(__dirname, '../public/js/script.js');
  if (!fs.existsSync(jsPath)) {
    throw new Error('public/js/script.js not found');
  }
});

// Test 9: Check if config file exists
test('Config file exists', () => {
  const configPath = path.join(__dirname, '../config.js');
  if (!fs.existsSync(configPath)) {
    throw new Error('config.js not found');
  }
});

// Test 10: Check if .env file exists (optional)
test('.env file exists (optional)', () => {
  const envPath = path.join(__dirname, '../.env');
  if (!fs.existsSync(envPath)) {
    console.log('⚠️  .env file not found (this is optional for local development)');
  }
});

console.log('\n📊 Test Results:');
console.log(`✅ Tests Passed: ${testsPassed}`);
console.log(`❌ Tests Failed: ${testsFailed}`);
console.log(`📈 Success Rate: ${Math.round((testsPassed / (testsPassed + testsFailed)) * 100)}%`);

if (testsFailed === 0) {
  console.log('\n🎉 All health checks passed! Your fitness tracker is ready to go!');
  process.exit(0);
} else {
  console.log('\n⚠️  Some health checks failed. Please review the errors above.');
  process.exit(1);
}
