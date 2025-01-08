// userRoutes.js
import express from 'express';
import User from '../models/user.js';
import { authenticateJWT } from '../middlewares.js'; // Example of a middleware that ensures the user is authenticated

const userRouter = express.Router();

// Get all users for the authenticated user
userRouter.get('/', authenticateJWT, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: 'Failed to fetch users' });
  }
});

// Route to get the authenticated user's profile
userRouter.get('/profile', authenticateJWT, (req, res) => {
  res.json(req.user); // Assuming user info is stored in req.user by Passport
});

// Route to update user's profile information
userRouter.put('/profile', authenticateJWT, (req, res) => {
  // You would normally update the user's profile in the database here
  // Example: update the user's name and email
  const { name, email } = req.body;
  req.user.name = name || req.user.name;
  req.user.email = email || req.user.email;

  res.json(req.user); // Return the updated user profile
});

// Route to delete the user's account
userRouter.delete('/account', authenticateJWT, (req, res) => {
  // You would normally delete the user from the database here
  // Example: remove user data based on their user ID
  const userId = req.user.id;
  // Simulating account deletion
  res.status(200).send(`Account with ID ${userId} has been deleted.`);
});

export default userRouter;
