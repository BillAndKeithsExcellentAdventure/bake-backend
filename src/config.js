import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from the .env file

// Environment variable validation
const config = {
  jwtSecret: process.env.JWT_SECRET,
  reactAppUrl: process.env.REACT_APP_URL || 'http://localhost:3002',
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
  nodeEnv: process.env.NODE_ENV || 'development',
  callbackURL:
    process.env.GOOGLE_CALLBACK_URL ||
    'http://localhost:5050/api/v1/auth/google/callback', // this URL must be set in the Google Cloud Console
  port: process.env.PORT || 80,
  dbSchema: process.env.DB_NAME || 'google_test',
  dbUser: process.env.DB_USER,
  dbPwd: process.env.DB_PASS,
  dbServer: process.env.DB_SERVER || 'localhost',
  dbPort: process.env.DB_PORT || 4408,
  sqliteDbUrl: process.env.SQLITE_DB_URL || './data/database.sqlite',
};

if (
  !config.googleClientID ||
  !config.googleClientSecret ||
  !config.sessionSecret
) {
  throw new Error('Missing required environment variables');
}

export default config;
