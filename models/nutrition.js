// models/nutrition.js
const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true, default: Date.now },
  meal_type: { 
    type: String, 
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    required: true
  },
  food_items: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true }, // g, ml, cup, piece, etc.
    calories: { type: Number, required: true },
    protein: { type: Number, default: 0 }, // in grams
    carbs: { type: Number, default: 0 }, // in grams
    fat: { type: Number, default: 0 }, // in grams
    fiber: { type: Number, default: 0 }, // in grams
    sugar: { type: Number, default: 0 }, // in grams
    sodium: { type: Number, default: 0 }, // in mg
  }],
  total_calories: { type: Number, default: 0 },
  total_protein: { type: Number, default: 0 },
  total_carbs: { type: Number, default: 0 },
  total_fat: { type: Number, default: 0 },
  notes: { type: String }
}, {
  timestamps: true
});

// Calculate totals before saving
nutritionSchema.pre('save', function(next) {
  this.total_calories = this.food_items.reduce((sum, item) => sum + item.calories, 0);
  this.total_protein = this.food_items.reduce((sum, item) => sum + item.protein, 0);
  this.total_carbs = this.food_items.reduce((sum, item) => sum + item.carbs, 0);
  this.total_fat = this.food_items.reduce((sum, item) => sum + item.fat, 0);
  next();
});

module.exports = mongoose.model('Nutrition', nutritionSchema);
