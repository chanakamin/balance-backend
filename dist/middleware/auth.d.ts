import { Request, Response, NextFunction } from 'express';
/**
 * Middleware to check if user is authenticated
 */
export declare const requireAuth: (req: Request, res: Response, next: NextFunction) => void;
/**
 * Middleware to redirect authenticated users away from auth pages
 */
export declare const redirectIfAuth: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map