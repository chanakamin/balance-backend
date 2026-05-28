"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
class AuthController {
    /**
     * Register a new user
     * POST /auth/register
     */
    static async register(req, res) {
        try {
            const { username, password } = req.body;
            // Validate input
            if (!username || !password) {
                res.status(400).json({
                    success: false,
                    error: 'Username and password are required',
                });
                return;
            }
            if (password.length < 6) {
                res.status(400).json({
                    success: false,
                    error: 'Password must be at least 6 characters',
                });
                return;
            }
            // Register user
            const user = await authService_1.AuthService.register({ username, password });
            res.status(201).json({
                success: true,
                data: {
                    id: user.id,
                    username: user.username,
                },
                message: 'User registered successfully',
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error.message || 'Registration failed',
            });
        }
    }
    /**
     * Login user
     * POST /auth/login
     */
    static async login(req, res) {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({
                    success: false,
                    error: 'Invalid username or password',
                });
                return;
            }
            res.json({
                success: true,
                data: {
                    id: user.id,
                    username: user.username,
                },
                message: 'Login successful',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message || 'Login failed',
            });
        }
    }
    /**
     * Logout user
     * POST /auth/logout
     */
    static logout(req, res) {
        req.logout((err) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    error: 'Logout failed',
                });
                return;
            }
            res.json({
                success: true,
                message: 'Logout successful',
            });
        });
    }
    /**
     * Get current user info
     * GET /auth/me
     */
    static getCurrentUser(req, res) {
        const user = req.user;
        if (!user) {
            res.status(401).json({
                success: false,
                error: 'Not authenticated',
            });
            return;
        }
        res.json({
            success: true,
            data: {
                id: user.id,
                username: user.username,
            },
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map