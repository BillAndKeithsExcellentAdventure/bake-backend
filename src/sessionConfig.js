import session from 'express-session';
import config from './config.js';

export const configureSession = () => {
  return session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: config.nodeEnv === 'production', // Use secure cookies only in production (https)
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  });
};
