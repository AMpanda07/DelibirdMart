const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appError');

/**
 * Sync / Authenticate Google OAuth User
 * POST /api/v1/auth/google
 */
exports.googleAuthSync = asyncHandler(async (req, res, next) => {
  const { googleId, displayName, email, avatar } = req.body;

  if (!googleId || !email) {
    return next(new AppError('Google ID and Email are required for authentication', 400));
  }

  // Find existing user or create a new one (Upsert)
  const user = await User.findOneAndUpdate(
    { googleId },
    {
      $setOnInsert: {
        googleId,
        displayName: displayName || email.split('@')[0],
        email,
        avatar: avatar || '',
        profession: 'Pokémon Trainer',
        region: 'Kalos',
        age: 18,
        badge: 'Explorer',
        adoptions: 0
      }
    },
    { upsert: true, new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: 'User authenticated successfully',
    data: {
      id: user._id,
      googleId: user.googleId,
      displayName: user.displayName,
      email: user.email,
      avatar: user.avatar,
      profession: user.profession || 'Pokémon Trainer',
      region: user.region || 'Kalos',
      age: user.age || 18,
      badge: user.badge || 'Explorer',
      adoptions: user.adoptions || 0,
      role: user.role,
      createdAt: user.createdAt
    }
  });
});

/**
 * Update Trainer Profile Card
 * PUT /api/v1/auth/profile
 */
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { googleId, displayName, profession, region, age } = req.body;

  if (!googleId) {
    return next(new AppError('Google ID is required to update profile', 400));
  }

  const user = await User.findOneAndUpdate(
    { googleId },
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
      googleId: user.googleId,
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
