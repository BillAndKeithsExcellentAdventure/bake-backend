import express from 'express';
import passport from 'passport';
import config from './config.js'; // Import config
import sequelize from './database/index.js';
import { configurePassport } from './passportConfig.js'; // Import passport config
import { configureSession } from './sessionConfig.js'; // Import session config
import authRoutes from './routes/authRoutes.js'; // Import authentication routes
import userRoutes from './routes/userRoutes.js'; // Import user-related routes
import todoRoutes from './routes/todoRoutes.js'; // Import todo-related routes
import { errorHandler } from './middlewares.js'; // Import error handler middleware
import User from './models/user.js';
import Todo from './models/todo.js';
import cors from 'cors';

const app = express();

// Alternatively, enable CORS only for specific origins
app.use(
  cors({
    origin: 'http://localhost:3002', // Replace with your frontend's URL
  })
);

// Initialize Passport.js
configurePassport();

// Use session configuration
app.use(configureSession());

// Initialize Passport.js session
app.use(passport.initialize());
app.use(passport.session());

// Body parsing middleware (for handling JSON and URL-encoded bodies)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/home', (req, res) => {
  res.send('<h1>Hello from the server!<h1>');
}); // This prefix is used for all authentication-related routes, including Google login and logout.

// Use the authentication routes under /api/v1/auth
app.use('/api/v1/auth', authRoutes); // This prefix is used for all authentication-related routes, including Google login and logout.

// Use the user routes under /api/v1/users
app.use('/api/v1/users', userRoutes); // This prefix is used for user-related routes like retrieving the profile or deleting the account.

// Use the ToDo routes under /api/v1/todos
app.use('/api/v1/todos', todoRoutes);

// Error handling middleware
app.use(errorHandler);

// Define associations after models are loaded
User.hasMany(Todo, {
  foreignKey: 'userId',
  onDelete: 'CASCADE', // If a user is deleted, their todos are deleted
});

Todo.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE', // If a todo is deleted, the userId reference is also deleted
});

sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Start the server
app.listen(config.port, () => {
  console.log(`Server running on ${config.port}`);
});
