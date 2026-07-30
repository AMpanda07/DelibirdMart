const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, 'Username must be at least 3 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  displayName: {
    type: String,
    required: [true, 'Display name is required'],
    trim: true
  },
  avatar: {
    type: String,
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
    default: 'trainer'
  }
}, {
  timestamps: true
});

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);