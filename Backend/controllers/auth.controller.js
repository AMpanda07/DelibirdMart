const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appError');

const JWT_SECRET = process.env.JWT_SECRET || 'delibirdmart_secret_key_2026';

// Helper to generate JWT Token
const sendTokenResponse = (user, statusCode, message, res) => {
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: '30d'
  });

  const userData = {
    id: user._id,
    username: user.username,
    displayName: user.displayName,
    email: user.email,
    avatar: user.avatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.username}`,
    profession: user.profession || 'Pokémon Trainer',
    region: user.region || 'Kalos',
    age: user.age || 18,
    badge: user.badge || 'Explorer',
    adoptions: user.adoptions || 0,
    adoptedPokemons: user.adoptedPokemons || [],
    role: user.role,
    createdAt: user.createdAt
  };

  res.status(statusCode).json({
    success: true,
    message,
    token,
    data: userData
  });
};

/**
 * Register a new Trainer
 * POST /api/v1/auth/register
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password, displayName, profession, region, age } = req.body;

  if (!username || !email || !password) {
    return next(new AppError('Username, email, and password are required', 400));
  }

  // Check if username or email already exists
  const existingUser = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
  });

  if (existingUser) {
    return next(new AppError('A trainer with this email or username already exists', 400));
  }

  const avatar = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`;

  const user = await User.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password,
    displayName: displayName || username,
    avatar,
    profession: profession || 'Pokémon Trainer',
    region: region || 'Kalos',
    age: age ? Number(age) : 18
  });

  sendTokenResponse(user, 201, 'Trainer registered successfully', res);
});

/**
 * Login Trainer
 * POST /api/v1/auth/login
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { emailOrUsername, email, username, password } = req.body;
  const identifier = emailOrUsername || email || username;

  if (!identifier || !password) {
    return next(new AppError('Please provide an email/username and password', 400));
  }

  const user = await User.findOne({
    $or: [
      { email: identifier.toLowerCase() },
      { username: identifier.toLowerCase() }
    ]
  }).select('+password');

  if (!user) {
    return next(new AppError('Invalid credentials', 401));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new AppError('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, 'Welcome back, Trainer!', res);
});

/**
 * Get Current Logged In Trainer
 * GET /api/v1/auth/me
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Not authorized to access this route', 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError('Trainer not found', 404));
    }

    sendTokenResponse(user, 200, 'Trainer profile fetched', res);
  } catch (err) {
    return next(new AppError('Token invalid or expired', 401));
  }
});

/**
 * Update Trainer Profile Card
 * PUT /api/v1/auth/profile
 */
exports.updateProfile = asyncHandler(async (req, res, next) => {
  let userId;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      userId = decoded.id;
    } catch (e) {}
  }

  const { id, googleId, displayName, profession, region, age } = req.body;
  const targetId = userId || id || googleId;

  if (!targetId) {
    return next(new AppError('User ID is required to update profile', 400));
  }

  const user = await User.findByIdAndUpdate(
    targetId,
    {
      ...(displayName && { displayName }),
      ...(profession && { profession }),
      ...(region && { region }),
      ...(age && { age: Number(age) })
    },
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(new AppError('User profile not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Trainer Card updated successfully',
    data: {
      id: user._id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      avatar: user.avatar,
      profession: user.profession,
      region: user.region,
      age: user.age,
      badge: user.badge,
      adoptions: user.adoptions,
      role: user.role,
      createdAt: user.createdAt
    }
  });
});

/**
 * Reset / Update Trainer Password
 * POST /api/v1/auth/reset-password
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { identifier, emailOrUsername, newPassword, password } = req.body;
  const targetIdentifier = identifier || emailOrUsername;
  const targetPassword = newPassword || password;

  if (!targetIdentifier || !targetPassword) {
    return next(new AppError('Please provide email/username and a new password', 400));
  }

  if (targetPassword.length < 6) {
    return next(new AppError('Password must be at least 6 characters long', 400));
  }

  const user = await User.findOne({
    $or: [
      { email: targetIdentifier.toLowerCase() },
      { username: targetIdentifier.toLowerCase() }
    ]
  });

  if (!user) {
    return next(new AppError('No registered trainer account found with those credentials', 404));
  }

  user.password = targetPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Trainer password reset successfully! You can now sign in with your new password.'
  });
});

/**
 * Adopt Pokémon companions and store in Trainer profile
 * POST /api/v1/auth/adopt
 */
exports.adoptPokemons = asyncHandler(async (req, res, next) => {
  let userId;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      userId = decoded.id;
    } catch (e) {}
  }

  if (!userId) {
    return next(new AppError('You must be signed in to adopt Pokémon companions', 401));
  }

  const { items, pokemons, pokemon } = req.body;
  const rawList = items || pokemons || (pokemon ? [pokemon] : []);

  if (!Array.isArray(rawList) || rawList.length === 0) {
    return next(new AppError('No Pokémon companions provided for adoption', 400));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError('Trainer profile not found', 404));
  }

  const formattedNewEntries = [];
  rawList.forEach(entry => {
    const p = entry.pokemon || entry;
    const qty = entry.quantity || 1;
    for (let i = 0; i < qty; i++) {
      formattedNewEntries.push({
        pokemonId: p.id || p.pokemonId || Math.floor(Math.random() * 1000),
        name: p.name || 'Unknown Companion',
        image: p.image || p.sprite || '',
        types: Array.isArray(p.types) ? p.types : (p.type ? [p.type] : ['Normal']),
        price: p.price || 0,
        adoptedAt: new Date()
      });
    }
  });

  user.adoptedPokemons.push(...formattedNewEntries);
  user.adoptions = (user.adoptions || 0) + formattedNewEntries.length;
  await user.save();

  sendTokenResponse(user, 200, `${formattedNewEntries.length} companion(s) adopted successfully!`, res);
});

