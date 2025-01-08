// todoRoutes.js
import express from 'express';
import Todo from '../models/todo.js';
import { authenticateJWT } from '../middlewares.js'; // Example of a middleware that ensures the user is authenticated

const todoRouter = express.Router();

// Create a new todo
todoRouter.post('/', authenticateJWT, async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      userId: req.user.id, // Associate the todo with the logged-in user
    });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create todo' });
  }
});

// Get all todos for the authenticated user
todoRouter.get('/', authenticateJWT, async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: { userId: req.user.id },
    });
    res.json(todos);
  } catch (err) {
    res.status(400).json({ error: 'Failed to fetch todos' });
  }
});

// Update a todo
todoRouter.put('/:id', authenticateJWT, async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (todo && todo.userId === req.user.id) {
      todo.title = req.body.title || todo.title;
      todo.completed =
        req.body.completed !== undefined ? req.body.completed : todo.completed;
      await todo.save();
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found or unauthorized' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Failed to update todo' });
  }
});

// Delete a todo
todoRouter.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (todo && todo.userId === req.user.id) {
      await todo.destroy();
      res.json({ message: 'Todo deleted' });
    } else {
      res.status(404).json({ error: 'Todo not found or unauthorized' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete todo' });
  }
});

export default todoRouter;
