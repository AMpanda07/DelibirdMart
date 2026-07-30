const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true // Ensures a Google account can only register once
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  avatar: {
    type: String, // Google will provide a profile picture URL
    default: ''
  },
  profession: {
    type: String,
    enum: ['Pokémon Trainer', 'Gym Leader', 'Researcher', 'Business Owner', 'Pokémon Pet Owner'],
    default: 'Pokémon Trainer'
  },
  region: {
    type: String,
    enum: ['Kalos', 'Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Alola', 'Galar', 'Paldea'],
    default: 'Kalos'
  },
  age: {
    type: Number,
    default: 18
  },
  badge: {
    type: String,
    default: 'Explorer'
  },
  adoptions: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    enum: ['trainer', 'admin'],
    default: 'trainer' // Everyone starts as a regular trainer
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('User', userSchema);