// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  profile: {
    age: Number,
    skinType: { type: String, enum: ['dry', 'oily', 'combination', 'sensitive', 'normal'] },
    concerns: [String],
    allergies: [String]
  },
  skinAnalyses: [{
    date: { type: Date, default: Date.now },
    imageUrl: String,
    confidence: Number,
    areas: {
      wrinkles_fine_lines: Number,
      surface_spots: Number,
      red_areas: Number,
      enlarged_pores: Number,
      uv_damage: Number,
      texture: Number,
      clogged_pores: Number,
      emerging_dark_spots: Number
    },
    goals: mongoose.Schema.Types.Mixed,
    recommendations: mongoose.Schema.Types.Mixed
  }],
  rewards: {
    points: { type: Number, default: 0 },
    badges: [String],
    level: { type: Number, default: 1 }
  },
  preferences: {
    notifications: { type: Boolean, default: true },
    privacy: { type: String, default: 'private' },
    reminderFrequency: { type: String, default: 'weekly' }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
