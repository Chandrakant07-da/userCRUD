import User from '../models/Users.js';
import redisClient from '../config/redis.js';
import { validationResult } from 'express-validator';

/**
 * Create a new user
 */
export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // eslint-disable-next-line no-unused-vars
    const { _id, ...userData } = req.body;
    const newUser = await User.create(userData);
    await redisClient.del('users');
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Get all users with Redis caching
 */
export const getUsers = async (req, res) => {
  try {
    const cachedUsers = await redisClient.get('users');
    
    if (cachedUsers) {
      return res.json(JSON.parse(cachedUsers));
    }

    const users = await User.find();
    await redisClient.set('users', JSON.stringify(users), 'EX', 3600);

    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    let user = await redisClient.get(`user_${id}`);
    
    if (user) {
      return res.json(JSON.parse(user));
    }

    user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await redisClient.set(`user_${id}`, JSON.stringify(user), 'EX', 3600);
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Update user by ID
 */
export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    await redisClient.del('users');
    await redisClient.del(`user_${id}`);

    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Delete user by ID
 */
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    await redisClient.del('users');
    await redisClient.del(`user_${id}`);

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
