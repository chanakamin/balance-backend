import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to check if user is authenticated
 */
export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized - Please log in',
    });
    return;
  }

  next();
};

/**
 * Middleware to redirect authenticated users away from auth pages
 */
export const redirectIfAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user) {
    res.status(400).json({
      success: false,
      message: 'Already authenticated',
    });
    return;
  }

  next();
};
