// config.js - Configuration file for the fitness tracker
module.exports = {
  // MongoDB Configuration
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/fitness-tracker',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  
  // Server Configuration
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0'
  },
  
  // Application Configuration
  app: {
    name: 'Fitness Tracker',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  }
};
