import { Request, Response } from 'express';
export declare class AuthController {
    /**
     * Register a new user
     * POST /auth/register
     */
    static register(req: Request, res: Response): Promise<void>;
    /**
     * Login user
     * POST /auth/login
     */
    static login(req: Request, res: Response): Promise<void>;
    /**
     * Logout user
     * POST /auth/logout
     */
    static logout(req: Request, res: Response): void;
    /**
     * Get current user info
     * GET /auth/me
     */
    static getCurrentUser(req: Request, res: Response): void;
}
//# sourceMappingURL=authController.d.ts.map