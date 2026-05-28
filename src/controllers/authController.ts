import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { ApiResponse, UserRegistration } from '../types';

export class AuthController {
  /**
   * Register a new user
   * POST /auth/register
   */
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      // Validate input
      if (!username || !password) {
        res.status(400).json({
          success: false,
          error: 'Username and password are required',
        } as ApiResponse<null>);
        return;
      }

      if (password.length < 6) {
        res.status(400).json({
          success: false,
          error: 'Password must be at least 6 characters',
        } as ApiResponse<null>);
        return;
      }

      // Register user
      const user = await AuthService.register({ username, password });

      res.status(201).json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
        },
        message: 'User registered successfully',
      } as ApiResponse<any>);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Registration failed',
      } as ApiResponse<null>);
    }
  }

  /**
   * Login user
   * POST /auth/login
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as any;

      if (!user) {
        res.status(401).json({
          success: false,
          error: 'Invalid username or password',
        } as ApiResponse<null>);
        return;
      }

      res.json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
        },
        message: 'Login successful',
      } as ApiResponse<any>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Login failed',
      } as ApiResponse<null>);
    }
  }

  /**
   * Logout user
   * POST /auth/logout
   */
  static logout(req: Request, res: Response): void {
    req.logout((err) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: 'Logout failed',
        } as ApiResponse<null>);
        return;
      }

      res.json({
        success: true,
        message: 'Logout successful',
      } as ApiResponse<null>);
    });
  }

  /**
   * Get current user info
   * GET /auth/me
   */
  static getCurrentUser(req: Request, res: Response): void {
    const user = req.user as any;

    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Not authenticated',
      } as ApiResponse<null>);
      return;
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
      },
    } as ApiResponse<any>);
  }
}
