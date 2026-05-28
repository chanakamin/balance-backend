import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { AuthController } from '../controllers/authController';
import { requireAuth, redirectIfAuth } from '../middleware/auth';

const router = Router();

/**
 * POST /auth/register
 * Register a new user
 */
router.post('/register', redirectIfAuth, AuthController.register);

/**
 * POST /auth/login
 * Login user with username and password
 */
router.post(
  '/login',
  redirectIfAuth,
  passport.authenticate('local', { failureMessage: true }),
  AuthController.login
);

/**
 * POST /auth/logout
 * Logout current user
 */
router.post('/logout', requireAuth, AuthController.logout);

/**
 * GET /auth/me
 * Get current authenticated user
 */
router.get('/me', AuthController.getCurrentUser);

export default router;
