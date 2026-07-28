const checkHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Delibird Mart API is running smoothly! 🚀',
    environment: process.env.NODE_ENV
  });
};

module.exports = { checkHealth };