import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { body, param } from 'express-validator';

const router = express.Router();

// Create a new user
router.post('/users', [
  body('user').isString().notEmpty(),
  body('interest').isArray().notEmpty(),
  body('age').isInt({ min: 10 }),
  body('mobile').isString().isLength({ min: 10 }),
  body('email').isEmail(),
], createUser);

// Get all users
router.get('/users', getUsers);

// Get user by ID
router.get('/users/:id', [
  param('id').isMongoId()
], getUserById);

// Update user by ID
router.put('/users/:id', [
  param('id').isMongoId(),
  body('user').optional().isString(),
  body('interest').optional().isArray(),
  body('age').optional().isInt({ min: 10 }),
  body('mobile').optional().isString().isLength({ min: 10 }),
  body('email').optional().isEmail(),
], updateUser);

// Delete user by ID
router.delete('/users/:id', [
  param('id').isMongoId()
], deleteUser);

export default router;
