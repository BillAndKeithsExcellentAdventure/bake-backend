import jwt from 'jsonwebtoken';
import config from './config.js'; // Import config

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

// Middleware to check if the user is authenticated
export const checkAuthentication = (req, res, next) => {
  // Check if the user is authenticated (Passport adds this method)
  if (req.isAuthenticated()) {
    return next(); // If authenticated, proceed to the next route handler
  } else {
    // If not authenticated, return a 401 Unauthorized status
    res.status(401).send('Not authenticated');
  }
};

export const authenticateJWT = (req, res, next) => {
  // Extract token from Bearer token
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.sendStatus(403); // No token provided

  // Verify the token
  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403); // Token is invalid or expired

    req.user = user.user; // Attach the decoded user data (including ID) to the request
    next();
  });
};
