module.exports = {
    secret: process.env.JWT_SECRET || 'SECRET_KEY',
    expiresIn: '1d',
  };