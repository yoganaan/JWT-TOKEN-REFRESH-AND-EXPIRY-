const { verifyAccessToken } = require('../utils/jwt.utils');
const User = require('../models/User.model');

// Middleware to verify access token
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Authorization denied.'
      });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = verifyAccessToken(token);
    
    // Get user from database
    const user = await User.findById(decoded.userId).select('-password -refreshToken');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Authorization denied.'
      });
    }

    // Attach user to request object
    req.user = user;
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    
    if (error.message === 'Invalid or expired access token') {
      return res.status(401).json({
        success: false,
        message: 'Token expired or invalid. Please refresh your token.',
        expired: true
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Authentication failed.'
    });
  }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
  next();
};

// Middleware to verify refresh token from cookies
const verifyRefreshTokenMiddleware = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token not found'
      });
    }
    
    req.refreshToken = refreshToken;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
};

module.exports = {
  authenticate,
  isAdmin,
  verifyRefreshTokenMiddleware
};
